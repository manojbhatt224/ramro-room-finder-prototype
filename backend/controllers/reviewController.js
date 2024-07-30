import { Review } from "../models/reviewModel.js";

class ReviewController {
  static async getAllReviews(req, res) {
    const {listingId}=req.body;
    if(listingId){
    try {
        const reviews=await Review.find({listingId})
        res.sendData(200, {reviews})
    } catch (error) {
        res.sendData(401, {error: error})
    }
}
else{
    res.sendData(400,{error:"Listing Id is Required!"})
}
  }
  static async getReview(req, res) {

    try {
    } catch (error) {}
  }
  static async addReview(req, res) {
    const userId = req.user._id;
    const { listingId, comment, rating } = req.body;

    if (listingId && comment && rating) {
      try {
        var newReview = new Review({ userId, listingId, comment, rating });
        newReview = await newReview.save();
        if (newReview._id) res.sendData(200, { review: newReview });
        else res.sendData(401, { error: "Error from third party database." });
      } catch (error) {
        res.sendData(401, { error: error });
      }
    } else {
      res.sendData(401, { error: "Required All Values" });
    }
  }
  static async updateReview(req, res) {
    const userId = req.user._id.toString();
    const reviewId = req.params.id;
    const { listingId, comment, rating } = req.body;
    try {
      var review = await Review.findOne({ _id: reviewId });
      if (!review?._id.toString()){
        res.sendData(400,{error:"No Such Review to Update!"})
      }
      else{
        if (userId !== review?.userId.toString() || listingId !== review?.listingId.toString()) {
            res.sendData(400, {
              error: "Only authorized user with matching listing can be updated!",
            });
          }
          else{
          var updatedReview = await Review.findByIdAndUpdate(
            reviewId,
            { comment, rating },
            { new: true }
          );
          if (updatedReview._id.toString()) res.sendData(200, { review: updatedReview });
          else res.sendData(400, {error:"Unable to update!"})
          
        }
      }
     
    } catch (error) {
      console.log(error);
      res.sendData(401, { error: error });
    }
  }

  static async deleteReview(req, res) {
    const userId=req.user._id.toString();
    const reviewId = req.params.id;
    try {
        var review = await Review.findOne({ _id: reviewId });
      if (!review?._id.toString()){
        res.sendData(400,{error:"No Such Review to Delete!"})
      }
      else if (userId !== review?.userId.toString()){
        res.sendData(400, {
            error: "Only authorized user can delete!",
          });
      }
      else {
        const deletedReview= await Review.findByIdAndDelete(reviewId);
        res.sendData(200, {Review: deletedReview})
      }
    } catch (error) {
        if (error?.name=="CastError"){
            res.sendData(401, { error: "Invalid Review Id Request" });
        }
        else
        res.sendData(401, { error: error });
    }
  }
}
export { ReviewController };
