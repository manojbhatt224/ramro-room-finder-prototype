import mongoose from 'mongoose'

const mediaSchema= new mongoose.Schema({
    listingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Listing',
      required: true,
    },
    path: {
      type: String,
      required: true,
    }, 
    type: {
        type: String,
        enum: ['Photo', 'Video'],
        required: true,
      },

  }, {timestamps:true});
  
  const Media = mongoose.model('Media', mediaSchema);
  export {Media}