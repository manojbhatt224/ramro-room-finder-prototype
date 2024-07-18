import express from 'express';
import { authRoutes } from './authRouter.js';
import { userRoutes } from './userRouter.js';
import { listingRoutes } from './listingRoute.js';

const router = express.Router();
//public routes
router.use("/auth", authRoutes);

//protected routes
router.use("/users", userRoutes);
router.use("/listings", listingRoutes)

export default router;
