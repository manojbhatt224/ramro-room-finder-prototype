import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { setUser, setTokens } from '../../slices/authSlice';
import { useNavigate } from 'react-router-dom';
import { Oval } from 'react-loader-spinner';

const RedirectionSSO = () => {
    const navigateTo=useNavigate();
    const dispatch=useDispatch();
    useEffect(() => {
        // Function to handle redirect from backend with user and token
        const handleRedirect = () => {
          // Parse query parameters from URL
          const params = new URLSearchParams(window.location.search);
          const user = JSON.parse(params.get('user'));
          const token = JSON.parse(params.get('token'));
    
          // Example: Log user and token
          console.log('User:', user);
          console.log('Token', token)
      // Store user and tokens in local storage
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', JSON.stringify(token));
      localStorage.setItem('isAuthenticated', true);

          dispatch(setUser(user));
          // dispatch(setTokens({accessToken:token.access_token, refreshToken: token.refresh_token}))
          console.log("I got everything so i am moving to next page")
        //   window.location.href = 'http://localhost:3000/dashboard';
          navigateTo('/dashboard');
          // Perform further actions based on user and token
          // For example, store in localStorage, redirect to another page, etc.
        };
    
        handleRedirect();
      }, []); // Run once on component mount
  return (
    <div style={{display:"flex", height:"100vh",justifyContent:"center", alignItems:"center"}}>
      <Oval visible={true} height="100" color="lightblue" ariaLabel="oval-loading" />
    </div>
  )
}

export default RedirectionSSO