import mongoose from "mongoose";
const favouriteSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  listingId: { type: mongoose.Schema.Types.ObjectId, ref: "Listing" },
});

favouriteSchema.index({ userId: 1, listingId: 1 }, { unique: true });
const Favourite = mongoose.model("Favourite", favouriteSchema);

export { Favourite };
