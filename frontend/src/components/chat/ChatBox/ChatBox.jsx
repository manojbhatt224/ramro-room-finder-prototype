import React, { useEffect, useState } from "react";

import { getUser,selectUser, selectUserLoading } from "../../../slices/userSlice";

import { useSelector, useDispatch } from "react-redux";
import { selectUser as selectAuthUser } from "../../../slices/authSlice";
import "./ChatBox.css";
import io from "socket.io-client";
import { useParams } from "react-router-dom";
import { useSocket } from "../../../context/SocketContext";

function ChatBox() {
  const { userId } = useParams();
  const { socket} = useSocket();
  const dispatch=useDispatch();
  const myself=useSelector(selectAuthUser);
  const loading=useSelector(selectUserLoading);
  const chatUser=useSelector(selectUser);
  var count=0;
  const [roomId, setRoomId]=useState('');


// Fetch user and set roomId when userId changes
useEffect(() => {
  const fetchUser = async () => {
    await dispatch(getUser(userId));
  };
  fetchUser();
}, [userId, dispatch]);

// Set roomId when chatUser is available
useEffect(() => {
  if (myself && chatUser && chatUser._id) {
    const room = [myself._id, chatUser._id].sort().join('_');
    setRoomId(room);
  }
}, [myself, chatUser]);

// Join the room when roomId is set
useEffect(() => {
  if (roomId) {
    socket?.emit('joinRoom', { roomId });
    console.log("Joined room:", roomId);
  }
}, [roomId, socket]);



  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const user = useSelector(selectUser);
  useEffect(() => {
    const handleMessage=async (message)=>{
      await setMessages((prevMessages) => [...prevMessages, message]);
      
      console.log('Message received:', message);

    }

    
    socket?.on("message", handleMessage);
    // Clean up the effect
    return () => {
      socket?.off("message", handleMessage);
    };
  }, []);

  const sendMessage = async(e) => {
    e.preventDefault();
    if (text.trim()) {
      count++;
      // Send message to the server
      socket.emit("message", {_id: count, roomId:roomId, receiver:chatUser._id, text: text.trim()})};
      setText("");
      // await setMessages((prevMessages) => [...prevMessages, {_id: count, receiver:chatUser._id, text: text.trim()}]);
    }
  

  return (
    <>
      <div className="chatbox-container">
      {!chatUser && (
        "Please select any chat to continue"
      ) } 
     {chatUser && !loading && (
        <>
         <div className="chatbox-top">
            <div className="chatbox-user">
              {chatUser.photourl ? (
                <img src={chatUser.photourl} alt="Profile" />
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
                  {chatUser.firstName.charAt(0).toUpperCase()}
                </div>
              )}
              <div className="chatbox-texts">
                <span>
                  {chatUser.firstName + " " + chatUser.lastName}
                </span>
                <p>Active Now</p>
              </div>
            </div>
            <div className="chatbox-icons">
              <img src="/images/phone.png" alt="" />
              <img src="/images/video.png" alt="" />
              <img src="/images/info.png" alt="" />
            </div>
          </div>
          <div className="chatbox-center">
            {messages.length>0 && messages.map((message)=>{
              return(

                <div
                style={{ alignSelf: message.receiverId  === user._id ? "flex-end" : "" }}
                className="chatbox-message"
                key={message._id}
               
              >
                {message.receiverId!==user._id && <img src="/images/avatar.png" alt="Avatar" />}
                <div className="chatboxmessage-texts">
                  <p
                    style={{
                      backgroundColor:
                        message.receiverId!==user._id ? "lightblue" : "lightgrey",
                    }}
                  >
                    {message?.text}
                  </p>
                  <span>1 min ago</span>
                </div>
              </div>
              )

            })}
            {/* {chatDistributer.map((x) => {
              return (
                <div
                  style={{ alignSelf: x % 2 === 0 ? "" : "flex-end" }}
                  className="chatbox-message"
                  key={x}
                >
                  {x % 2 === 0 && <img src="/images/avatar.png" alt="Avatar" />}
                  <div className="chatboxmessage-texts">
                    <p
                      style={{
                        backgroundColor:
                          x % 2 === 0 ? "lightblue" : "lightgrey",
                      }}
                    >
                      fsdafhadsf kdslfj l;aksf sdafjlkasdf;as fasd
                      fkasdfj;laksdjf asdl fjaslf asldkf jjsdaflkasjd;f asjdf;lk
                      sdlfjl asdfkljslad kasjdflkas lkjasdflakj sdfjalk
                    </p>
                    <span>1 min ago</span>
                  </div>
                </div>
              );
            })} */}
          </div>
          <div className="chatbox-bottom">
            <div className="chatboxBottom-icons">
              <img src="/images/img.png" alt="" />
              <img src="/images/camera.png" alt="" />
              <img src="/images/mic.png" alt="" />
            </div>
            <input
              type="text"
              placeholder="Type a message..."
              value={text}
              onChange={(e) => {
                setText(e.target.value);
              }}
            />
            <div className="chatbox-emoji">
              <img src="/images/emoji.png" alt="" />
            </div>
            <button onClick={sendMessage} className="chatbox-sendButton">
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
