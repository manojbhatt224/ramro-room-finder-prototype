import jwt from 'jsonwebtoken';
import { configDotenv } from 'dotenv';
configDotenv();

const socketAuth = (socket, next) => {
    const token = socket.handshake.headers.token;
    if (!token) {
        return next(new Error('Authentication error: No token provided'));
      }
    jwt.verify(token, process.env.JWT_ACCESS_SECRET, (err, decoded) => {
        if (err) {
            // res.sendData(401, "Unauthorized User",{'error':err})
            console.log(err)
            return next(new Error('Authentication error: Invalid token'));
        }
        socket.userId = decoded.id; 
        socket.userFullName=decoded.displayName;
        next();
    });
};

export default socketAuth;
