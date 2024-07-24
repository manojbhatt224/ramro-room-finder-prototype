import express from 'express';
import { authRoutes } from './authRoute.js';
import { userRoutes } from './userRouter.js';
import { listingRoutes } from './listingRoute.js';
import checkUserAuth from '../middlewares/auth-middleware.js';

const router = express.Router();
//public routes
router.use("/auth", authRoutes);

//protected routes
router.use("/users", userRoutes);
router.use("/listings",checkUserAuth, listingRoutes)

export default router;
