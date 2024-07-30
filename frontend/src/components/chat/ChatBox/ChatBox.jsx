import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectToken, selectUser } from "../../../slices/authSlice";

import "./ChatBox.css";
import io from "socket.io-client";

function ChatBox({ selectedUser }) {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const user = useSelector(selectUser);
  const token = useSelector(selectToken);
  const chatDistributer = [1, 2];
  const [globalSocket, setGlobalSocket] = useState(null);
  useEffect(() => {
    // Initialize the socket connection with the token
    const socket = io(`${import.meta.env.VITE_BACKEND_URL}`, {
      extraHeaders: {
        token: token.accessToken,
      },
    });
    setGlobalSocket(socket);

    // Handle connection errors
    socket.on("connect_error", (err) => {
      setError(err);
      console.log(err);
    });

    // Listen for messages from the server
    socket.on("message", async (message) => {
      await setMessages((prevMessages) => {
        prevMessages.push(message.text);
        return prevMessages;
      });
      console.log(messages);
    });

    // Clean up the effect
    return () => {
      socket.off("message");
      socket.off("connect_error");
    };
  }, [messages]);

  const sendMessage = () => {
    if (text.trim()) {
      // Send message to the server
      globalSocket.emit("message", {receiver:selectedUser._id, text: text.trim()})};
      setText("");
    }
  

  return (
    <div className="chatbox-container">
      {!selectedUser && (
        "Please select any chat to continue"
      ) } 
      
     {selectedUser && (
        <>
          <div className="chatbox-top">
            <div className="chatbox-user">
              {selectedUser.photourl ? (
                <img src={selectedUser.photourl} alt="Profile" />
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
                  {selectedUser.firstName.charAt(0).toUpperCase()}
                </div>
              )}
              <div className="chatbox-texts">
                <span>
                  {selectedUser.firstName + " " + selectedUser.lastName}
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
                style={{ alignSelf: message.receiver  === user._id ? "flex-end" : "" }}
                className="chatbox-message"
                key={message.text}
               
              >
                {message.receiver!==user._id && <img src="/images/avatar.png" alt="Avatar" />}
                <div className="chatboxmessage-texts">
                  <p
                    style={{
                      backgroundColor:
                        message.receiver!==user._id ? "lightblue" : "lightgrey",
                    }}
                  >
                    {message.text}
                  </p>
                  <span>1 min ago</span>
                </div>
              </div>
              )

            })}
            {chatDistributer.map((x) => {
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
            })}
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
  );
}

export default ChatBox;
