import mongoose from "mongoose";

const messageSchema=new mongoose.Schema(
{
chatId: { type: mongoose.Schema.Types.ObjectId, ref: 'Chat', required: true },
senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },  
text:{type:String},
read: { type: Boolean, default: false },
},
{timestamps:true}
);

const Message=mongoose.model("Message", messageSchema)
export {Message}
