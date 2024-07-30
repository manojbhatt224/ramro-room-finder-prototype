import React, { useEffect } from "react";
import { selectUser } from "../../../slices/authSlice";
import { useSelector, useDispatch } from "react-redux";
import {
  selectUsersLoading,
  selectUsers,
  getAllUsers,
} from "../../../slices/userSlice";

import "./ChatListBar.css";
import { Oval } from "react-loader-spinner";

function ChatListBar({ onUserClick }) {
  const myself = useSelector(selectUser);
  const dispatch = useDispatch();
  const chatUsers = useSelector(selectUsers);
  const usersLoading = useSelector(selectUsersLoading);
  const items = [1, 2, 3, 4];
  useEffect(() => {
    async function fetchUsers() {
      await dispatch(getAllUsers());
    }
    fetchUsers();
  }, []);

  const chats = [
    { id: 1, name: "John Doe", lastMessage: "Hey there!", unread: 2 },
    { id: 2, name: "Jane Smith", lastMessage: "Hello!", unread: 0 },
    // Add more chat data here
  ];

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

          <h2>{myself.firstName + " " + myself.lastName}</h2>
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
        {usersLoading && (
          <Oval
            visible={true}
            height="200"
            color="#000000"
            ariaLabel="oval-loading"
          />
        )}
        {!usersLoading &&
          chatUsers &&
          chatUsers
            .filter((user) => user._id !== myself._id)
            .map((user) => (
              <div
                key={user._id}
                className="item"
                onClick={() => {
                  onUserClick(user);
                }}
              >
                {user.photourl ? (
                  <img src={user.photourl} alt="Profile" />
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
                    {user.firstName.charAt(0).toUpperCase()}
                  </div>
                )}

                <div className="texts">
                  <span>{user.firstName + " " + user.lastName}</span>
                  <p>Hello</p>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
}

export default ChatListBar;
