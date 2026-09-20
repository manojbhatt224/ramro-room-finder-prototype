import busboy from 'busboy'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadDir = path.join(__dirname, '..', 'uploads');

fs.mkdirSync(uploadDir, { recursive: true });

const sanitizeFileName = (fileName = 'upload') => {
  const safeName = path.basename(fileName || 'upload')
    .replace(/[^a-zA-Z0-9_.-]/g, '_')
    .trim();

  return safeName || `upload_${Date.now()}`;
};

const handleFileUpload = (req) => {
  return new Promise((resolve, reject) => {
    const contentType = req.headers['content-type'] || '';

    if (!contentType.startsWith('multipart/form-data')) {
      return resolve({ files: [], fields: {} });
    }

    const bb = busboy({ headers: req.headers });
    const files = [];
    const fields = {};

    bb.on('file', (fieldname, file, filename, encoding, mimetype) => {
      const rawName = typeof filename === 'string' ? filename : filename?.filename || 'upload';
      const safeName = sanitizeFileName(rawName);
      const extension = path.extname(safeName).toLowerCase();
      const isImage = ['.jpg', '.jpeg', '.png', '.gif', '.webp'].includes(extension);
      const isVideo = ['.mp4', '.mov', '.avi', '.mkv', '.webm'].includes(extension);

      if (!isImage && !isVideo) {
        file.resume();
        return reject(new Error('Unsupported file type'));
      }

      const uniqueName = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}-${safeName}`;
      const saveTo = path.join(uploadDir, uniqueName);
      const writeStream = fs.createWriteStream(saveTo);

      file.on('error', (err) => reject(err));
      writeStream.on('error', (err) => reject(err));
      writeStream.on('finish', () => {
        const relativeUrl = `/uploads/${uniqueName}`;
        files.push({
          path: relativeUrl,
          type: isImage ? 'Photo' : 'Video',
        });
      });

      file.pipe(writeStream);
    });

    bb.on('field', (fieldname, val) => {
      fields[fieldname] = val;
    });

    bb.on('finish', () => {
      resolve({ files, fields });
    });

    bb.on('error', (err) => {
      reject(err);
    });

    req.pipe(bb);
  });
};

export { handleFileUpload };
