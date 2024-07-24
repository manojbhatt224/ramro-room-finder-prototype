import jwt from 'jsonwebtoken'
import { configDotenv } from 'dotenv'
import User from '../models/userModel.js'
configDotenv();
var checkUserAuth = async (req, res, next) => {
  let token
  const { authorization } = req.headers
  if (authorization && authorization.startsWith('Bearer')) {
    try {
      // Get Token from header
      token = authorization.split(' ')[1]

      // Verify Token
      const { id } = jwt.verify(token, process.env.JWT_ACCESS_SECRET)
  
      // Get User from Token
      req.user = await User.findById(id).select('-password')

      next()
    } catch (error) {
      res.sendData(401, {error: error})

    }
  }
  if (!token) {
    res.sendData(401, "User not authenticated with token")
    // res.status(401).send({ "status": "failed", "message": "Unauthorized User, No Token" })
  }
}

export default checkUserAuth