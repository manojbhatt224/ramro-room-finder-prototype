import React, {useState, useEffect} from "react";
import { useSelector, useDispatch} from 'react-redux';
import { login, signup, selectLoading, selectError, selectSuccess, setLoading, setError, setSuccess} from "../../slices/authSlice";
import {Oval} from 'react-loader-spinner'
import "./auth.css";
import Logo from "/logo.jpg";
import Swal from 'sweetalert2'
const Auth = () => {
  const error=useSelector(selectError);
  const success=useSelector(selectSuccess);
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);
  const handleGoogleLogin = () => {
      dispatch(setLoading);
    window.location.href = 'http://localhost:5000/api/auth/google/callback';
          
      }  

  const [confirmPass, setConfirmPass] = useState(true);
  const [isSignUp,setIsSignUp] = useState(false);
  const [userData, setUserData]=useState({
    username:"",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirm_password: "",
  })



  const handleChange=(e)=>{
   setUserData({ ...userData, [e.target.name]: e.target.value });
  }
  const handleSubmit=(e)=>{
    e.preventDefault();
    if(isSignUp){
      if(userData.password=== userData.confirm_password) {
        setConfirmPass(true)
        dispatch(signup(userData));
       }
       else
       setConfirmPass(false)
    
      
    }
    else{
      dispatch(login({ username: userData.email, password:userData.password }));
    }
   
  }
  const resetForm=()=>{
    setConfirmPass(true);
    setUserData(
      {
        firstName: "",
        lastName: "",
        username:"",
        email: "",
        password: "",
        confirm_password: "",
      }  
    )
  }
  useEffect(() => {
    if (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error,
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(setError(null));
        }
        else{
          dispatch(setError(null));
        } 
      });
    }
    if (success) {
      Swal.fire({
        title: "Congratulations!",
        text: success,
        icon: "success"
      }).then((result) => {
        if (result.isConfirmed) {
          resetForm();
          dispatch(setSuccess(null));
          setIsSignUp(false);
        }
        else{
          resetForm();
          dispatch(setSuccess(null));
          setIsSignUp(false);
        }
         
      });
    }
  }, [error,success]);
  
  return (
<div className="Auth">
      <div className="a-left">
        <img src={Logo} alt="" />
        <div className="Webname">
          <h1 className="app-title">Ramro Room Finder</h1>
          <h6 className="app-subtitle">An Ease to Rental Service</h6>
        </div>
      </div>

<div className="a-right">
        <form className="infoForm authForm" onSubmit={handleSubmit}>
          <h3>{isSignUp ? "Register" : "Login"}</h3>
          {isSignUp && (
            <div>
              <input
                required
                disabled={loading}
                type="text"
                placeholder="First Name"
                className="infoInput"
                name="firstName" value={userData.firstName}
                onChange={handleChange}

              />
              <input
                required
                type="text"
                disabled={loading}
                placeholder="Last Name"
                className="infoInput"
                name="lastName" value={userData.lastName}
                onChange={handleChange}

              />
                          <input
                required
                type="text"
                disabled={loading}
                placeholder="Username"
                className="infoInput"
                name="username" value={userData.username}
                onChange={handleChange}

              />
                {/* <input
                required
                type="text"
                disabled={loading}
                placeholder="Last Name"
                className="infoInput"
                name="mobile" value={userData.mobile}
                onChange={handleChange}    /> */}
            </div>
          )}

          <div>
            <input
              required
              disabled={loading}
              type="text"
              placeholder={isSignUp?`Email`:`Email/Username`}
              className="infoInput"
              name="email" value={userData.email}
              onChange={handleChange}
            />
          </div>
          <div>
            <input
              required
              disabled={loading}
              type="password"
              className="infoInput"
              placeholder="Password"
              name="password" value={userData.password}
              onChange={handleChange}

            />
            {isSignUp && (
              <input
                required
                disabled={loading}
                type="password"
                className="infoInput"
                name="confirm_password" value={userData.confirm_password}
                placeholder="Confirm Password" 
                onChange={handleChange}

              />
            )}
          </div>

          <span
            style={{
              color: "red",
              fontSize: "12px",
              alignSelf: "flex-end",
              marginRight: "5px",
              display: confirmPass ? "none" : "block",
            }}
          >
            *Confirm password is not same
          </span>
          <div>
            <span disabled={loading} onClick={()=>{setIsSignUp((prev)=>!prev); resetForm()}}
              style={{
                fontSize: "12px",
                cursor: "pointer",
                margin:"5px",
                textDecoration: "underline",
                color:"Blue"
              }}
            >
              {isSignUp
                ? "Already have an account Login"
                : "Don't have an account Sign up"}
            </span>
            <button
              className="button infoButton"
              type="Submit"
            disabled={loading}
            >
           {loading ? (
        <div className="button-content">
          <Oval visible={true} height="20" color="#f0f0f0" ariaLabel="oval-loading" />
        </div>
      ) : (
        <div className="button-content">
          {isSignUp ? "SignUp" : "Login"}
        </div>
      )}
    </button>
          </div>
          <button disabled={loading}
              className="button googleButton"
              type="button"
                onClick={handleGoogleLogin}
            >
       
        <div className="button-content">
          Sign In with Google
        </div>
    
              
            </button>
        </form>
      </div>    
    </div>
  );
};


export default Auth;
