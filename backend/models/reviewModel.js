import mongoose from 'mongoose'
const reviewSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  listingId: { type: mongoose.Schema.Types.ObjectId, ref: 'Listing', required: true },
  comment: { type: String, required: true },
  rating: { type: Number, min: 1, max: 5, required: true }, // Rating field
}, {timestamps: true});
reviewSchema.index({ userId: 1, listingId: 1 }, { unique: true });
const Review = mongoose.model('Review', reviewSchema);

export {Review}