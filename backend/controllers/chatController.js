import {Chat} from '../models/chatModel.js'

export const createChat = async (req, res) => {
  const newChat = new Chat({
    members: [req.body.senderId, req.body.receiverId],
  });
  try {
    const result = await newChat.save();
    res.sendData(200,{data: result});
  } catch (error) {
    res.sendData(500, {error: error})
  }
};

export const userChats = async (req, res) => {
  try {
    const chats = await Chat.find({
      members: { $in: [req.params.userId] },
    });
    res.sendData(200, {data:chats})
  } catch (error) {
    res.sendData(500, {error:error})
  }
};

export const findChat = async (req, res) => {
  try {
    const chat = await Chat.findOne({
      members: { $all: [req.params.firstId, req.params.secondId] },
    });
    res.sendData(200, {data:chat})
  } catch (error) {
  res.sendData(500, {error:error})
  }
};