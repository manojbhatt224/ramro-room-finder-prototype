import React from 'react'
import './UserInfo.css'

import { useSelector } from 'react-redux';
import { selectUser } from '../../../slices/authSlice';

const UserInfo = () => {
  const user=useSelector(selectUser);
  return (
    <div className="userInfo">
      <div className="userInfoUser">
        
        
      {user.photourl? (
  <img
    src={user.photourl}
    alt="Profile"
  />
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
      backgroundColor: "#ccc" // Optional: Adds a background color for better visibility
    }} 
   
  >
    {user.firstName.charAt(0).toUpperCase()}
  </div>
)}


        <h2>{user.firstName+' '+user.lastName}</h2>
      </div>
      <div className="userInfoIcons">

        <img src="/images/edit.png" alt=""/>
      </div>
    </div>
  )
}

export default UserInfo