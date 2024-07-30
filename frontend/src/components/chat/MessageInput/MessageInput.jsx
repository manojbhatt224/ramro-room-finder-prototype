import React, { useState } from 'react';
import './MessageInput.css';
import { Button, Form } from 'react-bootstrap';

function MessageInput() {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      // Handle sending the message
      setMessage('');
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="message-input-form">
      <Form.Control
        as="textarea"
        rows={2}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message..."
        className="message-input"
      />
      <Button variant="primary" type="submit" className="send-button">Send</Button>
    </Form>
  );
}

export default MessageInput;
