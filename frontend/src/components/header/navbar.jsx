import React, { useEffect, useState } from "react";
import Logo from '/logo.jpg'
import './navbar.css'
import { useSelector, useDispatch} from 'react-redux';
import { selectUser, logout } from '../../slices/authSlice';
import { Link,useLocation} from "react-router-dom";
import { FaCheckCircle, FaUserCircle } from "react-icons/fa";

const MyNavbar = () => {
  const user= useSelector(selectUser);
  const [imageError,setImageError]=useState(false);
  const location=useLocation();
  const dispatch=useDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };
  const handleProfileImageError=()=>{
    setImageError(true);
  }
  
  useEffect(() => {
    const handleOutsideClick = (event) => {
      const navbarToggler = document.querySelector('.navbar-toggler');
      const navbarCollapse = document.querySelector('.navbar-collapse');

      // Check if click was outside the navbar and navbar toggler is not collapsed
      if (navbarCollapse.classList.contains('show') &&
          !navbarToggler.contains(event.target) &&
          !navbarCollapse.contains(event.target)) {
        navbarCollapse.classList.remove('show');
        navbarToggler.classList.add('collapsed');
      }
    };

    // Add event listener on component mount
    document.addEventListener('click', handleOutsideClick);

    // Clean up event listener on component unmount
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []); // Empty dependency array ensures effect runs only once on mount

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand brand-title">
            Ramro Room Finder
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link
                  to="/home"
                  className={`nav-link ${location.pathname === '/home' ? 'active' : ''}`}
                  aria-current="page"
                  href="#"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/features" className={`nav-link ${location.pathname === '/features' ? 'active' : ''}`}>
                  Features
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/pricings" className={`nav-link ${location.pathname === '/pricings' ? 'active' : ''}`}>
                  Pricings
                </Link>
              </li>
              {user ? (
                <li className="nav-item dropdown">
                  <div
                    className="nav-link dropdown-toggle align-right"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >


<div className="profile-container">
      {user.photourl && !imageError ? (
        <div className="profile-img-container">
          <img
            src={user.photourl}
            alt="Profile"
            className="profile-img"
            onError={handleProfileImageError}
          />
          {user.verified && (
            <FaCheckCircle className="verified-icon" />
          )}
        </div>
      ) : (
        <div className="profile-img-container">
          <div style={{textAlign:"center"}}className="profile-img">{user.username.charAt(0).toUpperCase()}</div>
          {user.verified && (
            <FaCheckCircle className="verified-icon" />
          )}
        </div>
      )}
    </div>



                   {/* {user.photourl?( <img
                      src={user.photourl || Logo } // Ensure Logo is imported correctly
                      alt="error"
                      width="30"
                      height="30"
                      className="d-inline-block align-top profile-img"
                    />):
                  (<FaUserCircle className="profile-img"/>) 
                  } */}
                   
                    {user.firstName + " " + user.lastName}
                  </div>
                  <ul className="dropdown-menu">
                    <li>
                      <Link to="#" className="dropdown-item">
                        Change Password
                      </Link>
                    </li>
                    <li>
                      <Link to="#" className="dropdown-item" onClick={handleLogout}>
                        Log Out
                      </Link>
                    </li>
                  </ul>
                </li>
              ) : (
                <li className="nav-item">
                  <Link to="/auth" className={`nav-link ${location.pathname === '/auth' ? 'active' : ''}`}>
                    Join Us
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default MyNavbar;
