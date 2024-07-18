import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String }, // Optional: Only required for traditional signup
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  role: { type: String, enum: ['user','landlord', 'admin'], default: 'user' },
  ssoId: { type: String, unique: true, sparse: true }, // Google SSO ID (optional and unique)
  ssoProvider: { type: String },
  activated: {type:Boolean, default: true},
  verified: {type: Boolean, default: false},
  premium: {type: Boolean, default: false},
  photourl:{type:String}
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;