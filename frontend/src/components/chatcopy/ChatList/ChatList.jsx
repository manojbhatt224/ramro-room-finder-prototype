import React, { useEffect } from "react";
import { selectUser } from "../../../slices/authSlice";
import {setActiveChat } from "../../../slices/chatSlice";
import { useSelector, useDispatch } from "react-redux";
import "./ChatList.css";
import { Oval } from "react-loader-spinner";

function ChatList({chats}) {
  const myself = useSelector(selectUser);
  const dispatch = useDispatch();

  return (
    <div className="chatlistbar-container">
      <div className="userInfo">
        <div className="userInfoUser">
          {myself.photourl ? (
            <img src={myself.photourl} alt="Profile" />
          ) : (
            <div
              style={{
                textAlign: "center",
                width: "50px",
                height: "50px",
                padding: "15px",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#ccc", // Optional: Adds a background color for better visibility
              }}
            >
              {myself.firstName.charAt(0).toUpperCase()}
            </div>
          )}

          <h3>{myself.firstName + " " + myself.lastName}</h3>
        </div>
        <div className="userInfoIcons">
          <img src="/images/edit.png" alt="" />
        </div>
      </div>
      {/* <UserInfo/> */}

      {/* <UserInfo/> */}
      <div className="chatlist-container">
        <div className="chatListSearch">
          <div className="chatListSearchBar">
            <img src="/images/search.png" alt="" />
            <input type="text" placeholder="Search" />
          </div>
          <img src="/images/plus.png" alt="" className="add" />
        </div>
        <hr />

        {chats &&
          chats?.map((chat) => ( 
              <div
                key={chat?._id}
                className="item"
                onClick={() => dispatch(setActiveChat(chat))}
              >
                {chat?.chatUserDetails?.photourl ? (
                  <img src={chat?.chatUserDetails?.photourl} alt="Profile" />
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
                    {chat?.chatUserDetails?.firstName.charAt(0).toUpperCase()}
                  </div>
                )}

                <div className="texts">
                  <span>{chat?.chatUserDetails?.firstName + " " + chat?.chatUserDetails?.lastName}</span>
                  <p>Hello</p>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
}

export default ChatList;
