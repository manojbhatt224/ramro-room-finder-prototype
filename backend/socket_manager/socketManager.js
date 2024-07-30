import socketAuth from "../middlewares/socketAuth.js";

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
      console.log( socket.userFullName, "Connected", activeUsers);
    // send all active users to all users
    // io.emit("get-users", activeUsers);
    }
    socket.on('message', (message) => {
      console.log('Received message from', socket.userFullName, ':', message);
           
      socket.broadcast.emit('message', message);
    });
    // Cleanup on disconnect
    socket.on("disconnect", () => {
   // Decrement the user's connection count
   if (userConnections[socket.userId]) {
    userConnections[socket.userId] -= 1;
    if (userConnections[socket.userId] === 0) {
      delete userConnections[socket.userId];
      activeUsers = activeUsers.filter(user => user !== socket.userId);
      console.log("New User DisConnected", activeUsers);
    }
  }

    // send all active users to all users
    // io.emit("get-users", activeUsers);
    });
  });
}