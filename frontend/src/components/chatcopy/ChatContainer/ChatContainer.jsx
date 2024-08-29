import React, { useEffect, Suspense, lazy } from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {fetchChats, selectChatLoading, selectActiveChat, selectChatList} from '../../../slices/chatSlice'
import {Routes, Route } from 'react-router-dom'
import ChatListBar from '../ChatList/ChatList';
const ChatBox= lazy(()=>import("../ChatBox/ChatBox"));
import './ChatContainer.css';
import DLoader from '../../loaderDashboard/dLoader';

function ChatContainer() {
  const dispatch = useDispatch();
  const chats=useSelector(selectChatList);
  const activeChat= useSelector(selectActiveChat);
  

  useEffect(() => {
    dispatch(fetchChats());
  }, [dispatch]);
  

  return (
    <>  
    {/* <button style={{width:'50px'}} onClick={testing}>Test</button> */}
    <div className="chat-container">
      
     <ChatListBar chats={chats}/>
      {activeChat && <Suspense fallback={<DLoader/>}><ChatBox activeChat={activeChat}/></Suspense>}

     
    </div>
    </>
  
  );
}

export default ChatContainer;
