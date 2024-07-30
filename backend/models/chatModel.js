import mongoose from "mongoose";

const chatSchema=mongoose.Schema(
{
members: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
},
unreadCount:{ type: Number, default: 0 },
},
{
timestamps:true
}
);
const Chat= mongoose.model("Chat", chatSchema);

export {Chat}