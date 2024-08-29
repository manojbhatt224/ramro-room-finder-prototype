import socketAuth from "../middlewares/socketAuth.js";
import {Chat} from "../models/chatModel.js"
import {Message} from "../models/messageModel.js"

export async function setupSocket(io) {
  io.use(socketAuth);
  // Object to store user connections count
  let userConnections = {};
  let activeUsers = [];

  io.on("connection", (socket) => {
    if (!userConnections[socket.userId]) {
      userConnections[socket.userId] = 0;
    }
    userConnections[socket.userId] += 1;
    if (!activeUsers.includes(socket.userId)) {
      activeUsers.push(socket.userId);
      console.log(socket.userFullName, "Connected", activeUsers);
      // send all active users to all users
      // io.emit("get-users", activeUsers);
    }

      // Handle joining a room
  socket.on('joinRoom',  ({ roomId }) => {
    socket.join(roomId);
    console.log(`User ${socket.userFullName} joined room ${roomId}`);
  });

    socket.on("message", async (message) => {
      const senderId=socket?.userId;
      const receiverId=message?.receiver;
      const text=message?.text;
      const roomId=message?.roomId;
      console.log("Received message from", socket.userFullName, ":", message);
      try {
        // Check if a chat already exists between the two users
        let chat = await Chat.findOne({ members: { $all: [senderId, receiverId] } });
  
        if (!chat) {
          // If no chat exists, create a new one
          chat = new Chat({
            members: [senderId, receiverId],
          });
          await chat.save();
        }
  
        // Create and save the message
        const message = new Message({
          chatId: chat._id,
          senderId,
          text
        });
  
        await message.save();
  
        io.to(roomId).emit('message', message);
      } catch (error) {
        console.error("Error handling message:", error);
        socket.emit('error', { message: "Error handling message" });
      }
    });
    
    // Cleanup on disconnect
    socket.on("disconnect", () => {
      // Decrement the user's connection count
      if (userConnections[socket.userId]) {
        userConnections[socket.userId] -= 1;
        if (userConnections[socket.userId] === 0) {
          delete userConnections[socket.userId];
          activeUsers = activeUsers.filter((user) => user !== socket.userId);
          console.log("Active Users", activeUsers);
        }
      }
    });
  });
}
