import express from 'express';
import { ListingController } from '../controllers/listingController.js';

const router = express.Router()


router.get("/", ListingController.getAllListings);
router.get("/:id", ListingController.getListing);
router.post("/", ListingController.addListing);
 router.put("/:id", ListingController.updateListing);
 router.delete("/:id", ListingController.deleteListing);


export {router as listingRoutes}