import React, { useEffect, Suspense, lazy } from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {fetchChats, selectChatLoading, selectSelectedChatId, selectChatList, selectChat} from '../../../slices/chatSlice'
import {Routes, Route } from 'react-router-dom'
import ChatListBar from '../ChatListBar/ChatListBar';
const ChatBox= lazy(()=>import("../ChatBox/ChatBox"));
import './ChatContainer.css';
import DLoader from '../../loaderDashboard/dLoader';

function ChatContainer() {
  const dispatch = useDispatch();
  const chatList=useSelector(selectChatList);
  const selectedChatId = useSelector(selectSelectedChatId);
  const loading=useSelector(selectChatLoading);

  useEffect(() => {
    dispatch(fetchChats());
  }, [dispatch]);

  const handleSelectChat = (chatId) => {
    dispatch(selectChat(chatId));
  };

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
