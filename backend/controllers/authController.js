import Token from "../helpers/tokenGenerator.js";
import User from "../models/userModel.js";
import passport from "../config/passport-setup.js";
import bcrypt from "bcrypt";

import { v4 as uuidv4 } from 'uuid';
class AuthController {
  static async googleSSO(req, res, next) {
    passport.authenticate("google", { 
      scope: ["profile", "email"],
      state: JSON.stringify({ device_id: req.session.device_id, device_name: req.session.device_name}) 
    })(req, res);
  }

  static async googleSSOCallback(req, res, next) {
    if (!req.session.device_id) {
      req.session.device_id = uuidv4(); // Generate a device ID if not already set
  }
  req.session.device_name = req.headers['user-agent'] || 'Unknown Device';
  console.log(req.session.device_id);
  console.log(req.session.device_name);
    passport.authenticate(
      "google",
      {failureRedirect: "http://localhost:3000", 
      session:true,
      state: JSON.stringify({
        device_id: req.session.device_id,
        device_name: req.session.device_name})
    },
      (err, user) => {
        if (err) {
          return res.status(500).json({ error: "Internal Server Error" });
        }
        if (!user) {
          return res.status(401).json({ error: "Unauthorized" });
        }
        const token = Token.getToken(user);
        const serializedToken = JSON.stringify(token);
        res.redirect(
          `http://localhost:3000/redirectsso/?user=${encodeURIComponent(
            JSON.stringify(user)
          )}&token=${serializedToken}`
        );
        // return res.sendData(200, {
        //   user: user,
        //   token: token,
        // });
      }
    )(req, res, next);
  }
  static async loginUser(req, res) {
    const { username, password } = req.body;
    if (!username || !password) {
      res.sendData(401, {
        error: "Please input required fields.",
      });
    } else {
      try {
        const user = await User.findOne({
          $or: [{ username: username }, { email: username }],
        });
        if (user) {
          const isMatch = await bcrypt.compare(password, user.password);
          if (isMatch) {
            const token = Token.getToken(user);
            res.sendData(200, {
              user: user,
              token: token,
            });
          } else {
            res.sendData(401, { error: "Invalid Credentials." });
          }
        } else {
          res.sendData(401, { error: "You are not registered user." });
        }
      } catch (error) {
        res.sendData(401, { error: `${error}` });
      }
    }
  }
  static async refreshToken(req, res) {
    const client_refreshtoken = req.headers.authorization?.split(" ")[1];
    if (!client_refreshtoken) {
      res.sendData(401, { error: "Refresh token not provided." });
    } else {
      try {
        const token = Token.refreshToken(client_refreshtoken);
        res.sendData(200, { token: token });
      } catch (error) {
        res.sendData(401, { error: `${error}` });
      }
    }
  }

  static async signupUser(req, res) {
    const { username, password, email, confirm_password, firstName, lastName } =
      req.body;
    if (
      !username ||
      !email ||
      !password ||
      !confirm_password ||
      !firstName ||
      !lastName
    ) {
      res.sendData(401, {
        error: "Please input required fields.",
      });
    } else if (password !== confirm_password) {
      res.sendData(401, {
        error: "Password and confirm password didn't match!",
      });
    } else {
      try {
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        const newUser = {
          username: username,
          email: email,
          password: hashPassword,
          firstName: firstName,
          lastName: lastName,
          role: "user",
        };
        const doc = new User(newUser);
        await doc.save();
        const detail = {
          _id: doc._id,
          firstname: doc.firstname,
          lastname: doc.lastname,
          email: doc.email,
          username: doc.username,
        };
        res.sendData(200, "Registration Successful", { user: detail });
      } catch (error) {
        if (error.message.includes("E11000 duplicate key error")) {
          res.sendData(401, { error: "Email/Username already exists" });
        } else res.sendData(401, { error: `${error}` });
      }
    }
  }
}

export { AuthController };
