import busboy from 'busboy'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const handleFileUpload = (req) => {
  return new Promise((resolve, reject) => {
    if (req.headers['content-type'].startsWith('multipart/form-data')) {
    const bb = busboy({ headers: req.headers });
    const files = [];
    const fields = {};
    bb.on('file', (fieldname, file, filename, encoding, mimetype) => {
        const fileExtension = path.extname(filename.filename);
      const isImage = ['.jpg', '.jpeg', '.png', '.gif'].includes(fileExtension.toLowerCase());
      const isVideo = ['.mp4', '.mov', '.avi', '.mkv'].includes(fileExtension.toLowerCase());
    if (isImage || isVideo){
      const saveTo = path.join(__dirname.toString(), '..', 'uploads', path.basename(filename.filename));
      file.pipe(fs.createWriteStream(saveTo));
      files.push({ path: saveTo, type: isImage? 'Photo' : (isVideo?'Video':'')});
    }
    else{
        file.resume(); // Continue processing the stream to avoid hanging
        return reject(new Error('Unsupported file type'));
    }
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
}else {
    // For other content types, resolve without processing files
    resolve({ files: [], fields:{} });
  }
  });
};

export {handleFileUpload}
