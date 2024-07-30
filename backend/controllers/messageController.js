import {Message} from '../models/messageModel.js'

export const addMessage = async (req, res) => {
  const { chatId, senderId, text } = req.body;
  const message = new ({
    chatId,
    senderId,
    text,
  });
  try {
    const result = await message.save();
    res.sendData(200, {data:result})
  } catch (error) {
    res.sendData(500, {error:error})
  }
};

export const getMessages = async (req, res) => {
  const { chatId } = req.params;
  try {
    const results = await Message.find({ chatId });
    res.status(200, {data:results})
  } catch (error) {
    res.status(500, {error:error})
  }
};
