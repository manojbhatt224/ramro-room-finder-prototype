import mongoose from "mongoose";
import { Chat } from "../models/chatModel.js";
export async function getChatWithOwnerDetails(chatId, userId) {
    try {
      const result = await Chat.aggregate([
        {
          $match: {
            _id: new mongoose.Types.ObjectId(chatId),
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
  
  
      if (result.length === 0) {
        throw new Error('Chat not found');
      }
      return result[0]; 
    } catch (error) {
      throw new Error(`Aggregation error: ${error.message}`);
    }
  }
