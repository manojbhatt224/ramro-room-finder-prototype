import express from 'express'
import { configDotenv } from 'dotenv'
import { customRenderer } from './middlewares/customJSONRenderer.js';
import connectDB from './config/connectDB.js';
import cors from 'cors';
import routes from './routes/index.js';
import session from 'express-session';
import passport from './config/passport-setup.js'
import { errorHandler } from './helpers/errorHandler.js';
import cookieParser from 'cookie-parser'
import { handleFileUpload } from './helpers/fileUpload.js';

configDotenv();
const app= express();
const port=process.env.PORT;

// CORS Policy
app.use(cors({
    origin: '*', // Allow requests from React frontend
    credentials: true // Allow sending cookies with CORS requests
  }));

// Database Connection
connectDB(process.env.MONGOURL)

// JSON Configuration
app.use(express.json());
app.use(customRenderer);


// Setup session
app.use(cookieParser())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}));

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());



app.use('/api', routes)
app.use('/checkupload',async (req, res)=>{
  try {
    const {files } = await handleFileUpload(req);
    
    const medias=[];
    files.map((media) => {
      const newMedia = {
        path: media.path,
        type: media.type,
      };
      medias.push(newMedia);
    });

    res.sendData(200, {data:medias});

  } catch (error) {
    console.error('Transaction aborted due to error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



app.use(errorHandler);
app.listen(port, ()=>{
console.log("Serving backend at port", port)
})