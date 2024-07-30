import express from 'express';
import { ReviewController } from '../controllers/reviewController.js';

const router = express.Router()


router.get("/", ReviewController.getAllReviews);
router.get("/:id", ReviewController.getReview);
router.post("/", ReviewController.addReview);
 router.put("/:id", ReviewController.updateReview);
 router.delete("/:id", ReviewController.deleteReview);


export {router as reviewRoutes}