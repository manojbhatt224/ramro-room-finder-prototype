import { useState } from 'react'
import { useSelector} from 'react-redux';
import { selectUser } from './slices/authSlice';
import './App.css'
import Auth from './pages/auth/auth'
import MyNavBar from './components/header/navbar'
import Pricings from './pages/pricings/Pricings'
import Features from './pages/features/Features'
import Home from './pages/home/Home'
import {Routes, Route, Navigate} from 'react-router-dom'
import Dashboard from './pages/dashboard/Dashboard'
import RedirectionSSO from './pages/ssoredirection/RedirectionSSO'
import ErrorPage from './pages/errorpage/ErrorPage'
function App() {
  const user= useSelector(selectUser);
   return (
    <>
<div className="main_nav"><MyNavBar/></div>

  <div className="main">
          <Routes>
            <Route path="/" element={user?<Dashboard/>:<Navigate to="/home"/>}/>
            <Route path="/home" element={<Home/>}/>
            <Route path="/features" element={<Features/>} />
            <Route path="/pricings" element={<Pricings/>} />
            <Route path="/auth" element={user?<Navigate to="/dashboard"/>:<Auth/>} />
            <Route path="/dashboard/*" element={user?<Dashboard/>:<Navigate to="/auth"/>}/>
            <Route path="/redirectsso" element={<RedirectionSSO/>}/>
            <Route path="/error" element={<ErrorPage/>}/>
          </Routes>
        </div>
  
 
    
    </>
  )
}

export default App

