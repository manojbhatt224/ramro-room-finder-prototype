import express from 'express';
import { AuthController } from '../controllers/authController.js';
import { getDeviceDetail } from '../middlewares/deviceMiddleware.js';
const router = express.Router()

router.post("/signup", AuthController.signupUser);
router.post("/login", AuthController.loginUser);
router.get("/refreshtoken", AuthController.refreshToken)

// sso-google
router.get('/google', AuthController.googleSSO);
router.get('/google/callback', AuthController.googleSSOCallback);


export {router as authRoutes}