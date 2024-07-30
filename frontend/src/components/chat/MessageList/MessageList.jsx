import React from 'react';
import './MessageList.css';

function MessageList() {
  const messages = [
    { id: 1, text: 'Hello!', sender: 'me', time: '10:00 AM' },
    { id: 2, text: 'Hi there!', sender: 'other', time: '10:01 AM' },
    // Add more messages here
  ];

  return (
    <div className="message-list">
      {messages.map(message => (
        <div
          key={message.id}
          className={`message ${message.sender}`}
        >
          <div className="message-content">{message.text}</div>
          <div className="message-time">{message.time}</div>
        </div>
      ))}
    </div>
  );
}

export default MessageList;
