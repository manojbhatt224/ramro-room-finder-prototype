import mongoose from "mongoose";
import Token from "../helpers/tokenGenerator.js";
import User from "../models/userModel.js";

class UserController {
  static async getAllUsers(req, res) {
      try {
        const users = await User.find().select('-password');
        if (users) {
          res.sendData(200, {
            users: users,
          });
        } else {
          res.sendData(401, { error: "Invalid Credentials." });
        }
      } catch (error) {
        res.sendData(401, { error: `${error}` });
      }
    }
    static async getUser(req, res) {
      const userId = req.params.id;
      try {
        const user = await User.findOne({_id: new mongoose.Types.ObjectId(userId.trim())}).select('-password');
        if (user) {
          res.sendData(200, {
            user: user
          });
        } else {
          res.sendData(401, { error: "Invalid Credentials." });
        }
      } catch (error) {
        res.sendData(401, { error: `${error}` });
      }
    }
  }


export {UserController};
