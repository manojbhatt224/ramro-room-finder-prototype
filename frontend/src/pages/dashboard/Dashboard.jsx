import React, { lazy, Suspense, useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../slices/authSlice";
import "./Dashboard.css"
import SideBar from "../../components/sidebar/SideBar";
import {Routes, Route}from 'react-router-dom'
import Summary from "../summary/Summary";
import Favourites from "../../components/favourites/Favourites";
const Listings = lazy(() => import('../../components/listings/Listings'));
// import Listings from "../../components/listings/Listings";
const Explore =lazy(()=>import("../explore/Explore"));
import ChatContainer from "../../components/chat/ChatContainer/ChatContainer";
import { Oval } from "react-loader-spinner";
const Dashboard = () => {
  const user = useSelector(selectUser);
  return (
  <div className="dashboard-wrapper">
  <div className="dashboard-sidebar">
  <SideBar/>
  </div>
  <div className="dashboard-content">
  <Routes>
  <Route path="/" element={<Summary/>}/>
  <Route path="/favourites/*" element={<Favourites/>}/>
  <Route path="/chats/*" element={<ChatContainer/>}/>
  <Route path="/listings/*" element={   <Suspense fallback={<Oval visible={true} height="200" color="#000000" ariaLabel="oval-loading" />}>
  <Listings/>
      </Suspense>}/>
  <Route path="/explore/*" element={<Suspense fallback={<Oval visible={true} height="200" color="#000000" ariaLabel="oval-loading" />}><Explore/></Suspense>}/>
  </Routes>
  </div>
  </div>
);
};
export default Dashboard;
