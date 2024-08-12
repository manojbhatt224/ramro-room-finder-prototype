import { useState } from 'react'
import { useSelector} from 'react-redux';
import { selectUser,selectIsAuthenticated } from './slices/authSlice';
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
import TestMap from './components/map/TestMap';
function App() {
  const isAuthenticated= useSelector(selectIsAuthenticated);
   return (
    <>
<div className="main_nav"><MyNavBar/></div>

  <div className="main">
          <Routes>
            <Route path="/" element={isAuthenticated?<Dashboard/>:<Navigate to="/home"/>}/>
            <Route path="/home" element={<Home/>}/>
            <Route path="/features" element={<Features/>} />
            <Route path="/pricings" element={<Pricings/>} />
            <Route path="/auth" element={isAuthenticated?<Navigate to="/dashboard"/>:<Auth/>} />
            <Route path="/dashboard/*" element={isAuthenticated?<Dashboard/>:<Navigate to="/auth"/>}/>
            <Route path="/redirectsso" element={<RedirectionSSO/>}/>
            <Route path="/error" element={<ErrorPage/>}/>
            <Route path="/testmap" element={<TestMap/>}/>
          </Routes>
        </div>
  
 
    
    </>
  )
}

export default App

