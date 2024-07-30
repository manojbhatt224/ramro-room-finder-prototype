import React, { useState } from 'react';
import ChatListBar from '../ChatListBar/ChatListBar';
import ChatBox from '../ChatBox/ChatBox';
import './ChatContainer.css';

function ChatContainer() {
  const [selectedUser, setSelectedUser] = useState(null);
  const handleUserClick = async (user) => {
    console.log("I am clicked.")
    await setSelectedUser(user);
    console.log(selectedUser);

  };
  return (
    <div className="chat-container">
     <ChatListBar onUserClick={handleUserClick} />
     <ChatBox selectedUser={selectedUser}/>
    </div>
  );
}

export default ChatContainer;
