import mongoose from "mongoose";
import { Chat } from "../models/chatModel.js";
import { getChatWithOwnerDetails } from "../aggregations/chat.js";

export const createChat = async (req, res) => {
  const senderId = req.user._id;
  const receiverId = req.body.receiverId;
  console.log("receiverId,", receiverId);
  try {
    // Check if a chat already exists between these users
    let chat = await Chat.findOne({
      members: { $all: [senderId, receiverId] },
    });
    if (chat) {
      console.log("This is chat", chat)
      const chatDetail=await getChatWithOwnerDetails(chat._id, senderId);
      res.sendData(200,{ chat: chatDetail});
    } else {
      // Create a new chat if none exists
      chat = new Chat({ members: [senderId, receiverId] });
      await chat.save();
      const chatDetail=await getChatWithOwnerDetails(chat._id,senderId);
      console.log(chatDetail);
      res.sendData(200,{ chat: chatDetail});
    }
  } catch (error) {
    console.log(error);
    res.sendData(500, { error: error });
  }
};

export const userChats = async (req, res) => {
  try {
    const userId = req.user?._id;

    const chats = await Chat.aggregate([
      {
        $match: {
          members: { $in: [userId] },
        },
      },
      {
        $addFields: {
          otherUserId: {
            $filter: {
              input: "$members",
              as: "member",
              cond: { $ne: ["$$member", userId] },
            },
          },
        },
      },
      {
        $unwind: "$otherUserId",
      },
      {
        $lookup: {
          from: "users",
          localField: "otherUserId",
          foreignField: "_id",
          as: "chatUserDetails",
        },
      },
      {
        $unwind: "$chatUserDetails",
      },
      {
        $project: {
          _id: 1,
          chatUserDetails: 1,
          unreadcount: 1,
        },
      },
    ]);

    res.sendData(200, { chats });
  } catch (error) {
    console.log(error);
    res.sendData(500, { error: error });
  }
};

export const findChat = async (req, res) => {
  try {
    const chat = await Chat.findOne({
      members: { $all: [req.params.firstId, req.params.secondId] },
    });
    res.sendData(200, { data: chat });
  } catch (error) {
    res.sendData(500, { error: error });
  }
};
