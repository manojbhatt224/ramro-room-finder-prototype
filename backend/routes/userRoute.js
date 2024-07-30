import express from 'express';
import { UserController } from '../controllers/userController.js';

const router = express.Router()

router.get("/", UserController.getAllUsers);
router.get("/:id", UserController.getUser);
 router.put("/:id", (req, res)=>{
    const data=req.body;
    res.send("User put request.") 
 });
 router.delete("/:id", (req, res)=>{
    const data=req.body;
    res.send("User Delete Request") 
 });
 
export {router as userRoutes}