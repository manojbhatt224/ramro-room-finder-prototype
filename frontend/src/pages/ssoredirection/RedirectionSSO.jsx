import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { setUser, setTokens, setIsAuthenticated } from '../../slices/authSlice';
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
    
          dispatch(setUser(user));
          dispatch(setTokens(token));
          dispatch(setIsAuthenticated(true));
          navigateTo('/dashboard');
        };
    
        handleRedirect();
      }, []);
  return (
    <div style={{display:"flex", height:"100vh",justifyContent:"center", alignItems:"center"}}>
      <Oval visible={true} height="100" color="lightblue" ariaLabel="oval-loading" />
    </div>
  )
}

export default RedirectionSSO