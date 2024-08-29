import express from 'express';
import { locationRoutes } from './locationRoute.js';

import { authRoutes } from './authRoute.js';
import { userRoutes } from './userRoute.js';
import { listingRoutes } from './listingRoute.js';
import { chatRoutes } from './ChatRoute.js';
import { messageRoutes } from './MessageRoute.js';
import { reviewRoutes } from './reviewRoute.js';
import { favouriteRoutes } from './favouriteRoute.js';
import checkUserAuth from '../middlewares/auth-middleware.js';


const router = express.Router();
//public routes
router.use("/auth", authRoutes);
router.use("/location", locationRoutes);

//protected routes
router.use("/users", checkUserAuth, userRoutes);
router.use("/listings",checkUserAuth, listingRoutes)
router.use("/chats",checkUserAuth, chatRoutes)
router.use("/reviews",checkUserAuth, reviewRoutes)
router.use("/favourites",checkUserAuth, reviewRoutes)
router.use("/chats/messages",checkUserAuth, messageRoutes)

export default router;
