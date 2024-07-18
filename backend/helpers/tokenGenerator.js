import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();

class Token {
  static getToken(user) {
    const access_token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_ACCESS_SECRET,
      { expiresIn: process.env.JWT_ACCESS_EXPIRE_TIME }
    );


    const refresh_token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: process.env.JWT_REFRESH_EXPIRE_TIME }
    );
    const token = { accessToken: access_token, refreshToken: refresh_token };
    return token;
  }
  
  static refreshToken(refreshToken) {
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    if(decoded){
        const access_token = jwt.sign(
            { id: decoded.id, username: decoded.username },
            process.env.JWT_ACCESS_SECRET,
            { expiresIn: process.env.JWT_ACCESS_EXPIRE_TIME }
          );
          const refresh_token = jwt.sign(
            { id: decoded.id, username: decoded.username },
            process.env.JWT_REFRESH_SECRET,
            { expiresIn: process.env.JWT_REFRESH_EXPIRE_TIME }
          );
          const token = { accessToken: access_token, refreshToken: refresh_token };
          return token;
    }
    return null;  
  }
  
}
export default Token