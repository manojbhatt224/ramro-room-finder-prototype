
import mongoose from 'mongoose'
const Schema = mongoose.Schema;

const listingSchema = new mongoose.Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String,  enum: ['Room','Flat', 'House'], default: 'room'}, 
    title: { type: String, required: true },
    description: { type: String, default: '' },
    price: { type: Number, required: true },
    location: { type: String, default: '' },
    parking: {type: Boolean, default: 'false'},
    area: {type: Number, required: true}
}, {discriminatorKey: 'type', timestamps:true});

const Listing = mongoose.model('Listing', listingSchema);

const roomSchema = new mongoose.Schema({
    bed: {type: Boolean, default:false},
    maxPeople:{type: Number}
});

const Room = Listing.discriminator('Room', roomSchema);

const flatSchema = new mongoose.Schema({
    kitchen: { type: Boolean, default: false},
    hall: {type:Boolean, default:false},
    bedrooms: { type: Number, required: true},
    maxPeople:{type: Number, required:true}
});


const Flat = Listing.discriminator('Flat', flatSchema);

const houseSchema = new mongoose.Schema({
    garden: { type: Boolean, default: false },
    rooms: { type: Number, required: true },
});

const House = Listing.discriminator('House', houseSchema);

export {Room, Flat, House, Listing}