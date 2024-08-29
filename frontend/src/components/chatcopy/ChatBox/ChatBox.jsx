import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectUser as selectAuthUser } from "../../../slices/authSlice";
import { fetchMessages, selectMessages, selectLoading, addMessage } from "../../../slices/messageSlice";
import "./ChatBox.css";
import { useSocket } from "../../../context/SocketContext";
import { getTimeAgo } from "../../../helpers/timeAgo";

function ChatBox({ activeChat }) {
  const myself = useSelector(selectAuthUser);
  const { socket } = useSocket();
  const dispatch = useDispatch();
  const [roomId, setRoomId] = useState("");
  const messages=useSelector(selectMessages);
  const loading=useSelector(selectLoading);
  const endOfMessagesRef = useRef(null);
  const [text, setText] = useState("");
const textBoxRef=useRef(null);

  
  // Loading Messages of active chat if available
  useEffect(()=>{
    if(activeChat?._id){
dispatch(fetchMessages(activeChat?._id))
    }
  },[dispatch, activeChat])

  // Set roomId when activeChat is available
  useEffect(() => {
    if (myself && activeChat?.chatUserDetails) {
      const room = [myself._id, activeChat?.chatUserDetails?._id].sort().join('_');
      setRoomId(room);
    }
  }, [myself, activeChat]);

  // Join the room when roomId is set
  useEffect(() => {
    if (roomId) {
      socket?.emit('joinRoom', { roomId });
      console.log("Joined room:", roomId);
    }
  }, [roomId, socket]);

  useEffect(() => {
    const handleMessage=async (message)=>{
      console.log(message);
     dispatch(addMessage(message));

    }

    socket?.on("message", handleMessage);
    
    // Clean up the effect
    return () => {
      socket?.off("message", handleMessage);
    };
  }, [socket, dispatch, activeChat?._id]);

  const sendMessage = async(e) => {
    e.preventDefault();
    if (text.trim()) {
      // Send message to the server
      socket.emit("message", {roomId:roomId, receiver:activeChat?.chatUserDetails?._id, text: text.trim()})};
      setText("");
    }

      // Scroll to the bottom when messages change
  useEffect(() => {
    if (endOfMessagesRef.current) {
      endOfMessagesRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault(); // Prevent the default Enter key behavior (e.g., form submission)
      sendMessage(event); // Call the sendMessage function directly
      textBoxRef.current.value = ''; // Clear the text box after sending
    }
  };

  return (
    <>
      <div className="chatbox-container">
        {!activeChat && "Please select any chat to continue"}
        {activeChat && (
          <>
            <div className="chatbox-top">
              <div className="chatbox-user">
                {activeChat?.chatUserDetails?.photourl ? (
                  <img
                    src={activeChat?.chatUserDetails?.photourl}
                    alt="Profile"
                  />
                ) : (
                  <div
                    style={{
                      textAlign: "center",
                      width: "50px",
                      height: "50px",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "#ccc", // Optional: Adds a background color for better visibility
                    }}
                  >
                    {activeChat?.chatUserDetails?.firstName
                      .charAt(0)
                      .toUpperCase()}
                  </div>
                )}
                <div className="chatbox-texts">
                  <span>
                    {activeChat?.chatUserDetails?.firstName +
                      " " +
                      activeChat?.chatUserDetails?.lastName}
                  </span>
                  <p>Active Now</p>
                </div>
              </div>
            </div>
            <div className="chatbox-center">
              {loading && (<h1>I am loading</h1>)}
              {!loading && messages?.length>0 && messages?.map((message)=>{
              return(

                <div
                style={{ alignSelf: message?.senderId  === myself?._id ? "flex-end" : "" }}
                className="chatbox-message"
                key={message?._id}
               
              >
                {message.senderId!==myself._id && <img src="/images/avatar.png" alt="Avatar" />}
                <div className="chatboxmessage-texts">
                  <p
                    style={{
                      backgroundColor:
                        message?.senderId!==myself?._id ? "lightblue" : "lightgrey",
                    }}
                  >
                    {message?.text}
                  </p>
                  <span>{getTimeAgo(message?.updatedAt)}</span>
                </div>
              </div>
              )

            })}
             {/* This div is used to scroll to the bottom  */}
      <div ref={endOfMessagesRef} />
            </div>
            <div className="chatbox-bottom">
              <input
                type="text"
                placeholder="Type a message..."
                value={text}
                ref={textBoxRef}
                onKeyDown={handleKeyDown}
                onChange={(e) => {
                  setText(e.target.value);
                }}
              />
         
              <button 
              onClick={sendMessage} 
              className="chatbox-sendButton">
                Send
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default ChatBox;
