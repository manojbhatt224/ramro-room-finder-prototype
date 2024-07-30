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
import http from "http";
import { Server as SocketIOServer } from "socket.io";
import { setupSocket } from './socket_manager/socketManager.js';

import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

configDotenv();
const app= express();
const server = http.createServer(app);
const io = new SocketIOServer(server, {
  cors: {
      origin: "*",
      methods: ["GET", "POST"],  
      credentials: true     
  }
  });
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


// Serve static files from the "uploads" directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

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

app.use(errorHandler);


setupSocket(io);
server.listen(port, ()=>{
console.log("Serving backend at port", port)
})