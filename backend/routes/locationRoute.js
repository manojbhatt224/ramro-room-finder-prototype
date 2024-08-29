import express from 'express';
import { LocationController } from '../controllers/locationController.js';

const router = express.Router()


router.get("/search", LocationController.searchLocation);



export {router as locationRoutes}