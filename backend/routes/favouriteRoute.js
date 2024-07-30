import express from 'express';
import { FavouriteController } from '../controllers/favouriteController.js';

const router = express.Router()


router.post("/", FavouriteController.addFavourite)
router.get("/", FavouriteController.getUserFavourites);
router.delete("/:id", FavouriteController.deleteFavourite);




export {router as favouriteRoutes}