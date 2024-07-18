import express from 'express';

const router = express.Router()

router.get("/", (req, res)=>{
    res.send("All users fetched")
});
router.get("/:id", (req, res)=>{
   res.send("Single user fetched") 
});
 router.put("/:id", (req, res)=>{
    const data=req.body;
    res.send("User put request.") 
 });
 router.delete("/:id", (req, res)=>{
    const data=req.body;
    res.send("User Delete Request") 
 });
 
export {router as userRoutes}