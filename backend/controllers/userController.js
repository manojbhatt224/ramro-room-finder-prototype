import Token from "../helpers/tokenGenerator.js";
import { userDAO } from "../dao/userDAO.js";

class AuthController {
  static async loginUser(req, res) {
    console.log("User Requested")
    const { username, password } = req.body;
    if (!username || !password) {
      res.sendData(401, {
        error: "Please input required fields.",
      });
    } else {
      try {
        const user = await userDAO.findUserByUsernameAndPassword(
          username,
          password
        );
        if (user) {
          const token = Token.getToken(user);
          res.sendData(200, {
            user: user,
            token: token,
          });
        } else {
          res.sendData(401, { error: "Invalid Credentials." });
        }
      } catch (error) {
        res.sendData(401, { error: `${error}` });
      }
    }
  }
  static async refreshToken(req, res) {
    const client_refreshtoken = req.headers.authorization?.split(" ")[1];
    if (!client_refreshtoken) {
        res.sendData(401, {error:"Refresh token not provided."})
    }
    try {
            const token=Token.refreshToken(client_refreshtoken)
        res.sendData(200, {token:token});
    } catch (error) {
        res.sendData(401, {error: `${error}`});
    }
}

  static async signupUser(req, res) {
    const { username, password, email, confirm_password, firstName, lastName } =
      req.body;
    if (
      !username ||
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
        
      }
    else{
      try {
        const newUser = {
          username: username,
          email: email,
          password: password,
          firstName: firstName,
          lastName: lastName,
        };
        const state = await userDAO.createUser(newUser);
        if (state instanceof Error) {
          res.sendData(200, {
            msg: state.message,
          });
        } else if(state){
          res.sendData(200, {
            msg: "User signed up successfully.",
            user:state
          });
        } 
        else {
          res.sendData(401, { error: "User didnt signed up!" });
        }
      } catch (error) {
        res.sendData(401, { error: `${error}` });
      }
    }
    }
  }


export { AuthController };
