import { Favourite } from "../models/favouriteModel.js";

class FavouriteController {
static async addFavourite(req, res) {
        const userId = req.user._id;
        const { listingId} = req.body;
    
        if (listingId) {
          try {
            var newFavourite = new Favourite({ userId, listingId});
            newFavourite = await newFavourite.save();
            if (newFavourite?._id) res.sendData(200, { review: newReview });
            else res.sendData(401, { error: "Error from third party database." });
          } catch (error) {
            res.sendData(401, { error: error });
          }
        } else {
          res.sendData(401, { error: "Required All Values" });
        }
      }

      static async deleteFavourite(req, res) {
        const userId=req.user._id.toString();
        const favouriteId = req.params.id;
        try {
            var favourite = await Favourite.findOne({ _id: favouriteId });
          if (!favourite?._id.toString()){
            res.sendData(400,{error:"No Such favouorite to delete!"})
          }
          else if (userId !== favourite?.userId.toString()){
            res.sendData(400, {
                error: "Only authorized user can delete!",
              });
          }
          else {
            const deletedFavourite= await Favourite.findByIdAndDelete(favouriteId);
            res.sendData(200, {Review: deletedFavourite})
          }
        } catch (error) {
            if (error?.name=="CastError"){
                res.sendData(401, { error: "Invalid Favourite Id Request" });
            }
            else
            res.sendData(401, { error: error });
        }
      }
      
  static async getUserFavourites(req, res) {
    const userId=req.user._id.toString();
    // const {listingId}=req.body;
    // if(listingId){
    // try {
    //     const reviews=await Review.find({listingId})
    //     res.sendData(200, {reviews})
    // } catch (error) {
    //     res.sendData(401, {error: error})
    // }
// }
// else{
//     res.sendData(400,{error:"Listing Id is Required!"})
// }
  }
  
}
export { FavouriteController };
