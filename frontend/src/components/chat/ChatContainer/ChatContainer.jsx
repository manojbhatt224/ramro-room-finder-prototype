import React, { useState, Suspense, lazy } from 'react';
import {Routes, Route } from 'react-router-dom'
import ChatListBar from '../ChatListBar/ChatListBar';
const ChatBox= lazy(()=>import("../ChatBox/ChatBox"));
import './ChatContainer.css';
import DLoader from '../../loaderDashboard/dLoader';

function ChatContainer() {

  return (
    <div className="chat-container">
     <ChatListBar/>
     <Routes>
  <Route path="/:userId" element={<Suspense fallback={<DLoader/>}><ChatBox/></Suspense>}/>
  </Routes>
     
    </div>
  );
}

export default ChatContainer;
