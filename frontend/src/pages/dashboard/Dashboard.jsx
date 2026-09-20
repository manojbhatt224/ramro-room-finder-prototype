import React, { lazy, Suspense, useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../slices/authSlice";
import "./Dashboard.css"
import SideBar from "../../components/sidebar/SideBar";
import {Routes, Route}from 'react-router-dom'
import Summary from "../summary/Summary";
import Favourites from "../../components/favourites/Favourites";
const Listings = lazy(() => import('../../components/listings/Listings'));
const Explore =lazy(()=>import("../explore/Explore"));
import ChatContainer from "../../components/chatcopy/ChatContainer/ChatContainer";
import DLoader from "../../components/loaderDashboard/dLoader";
import SinglePage from "../explore/SinglePage";
import { SocketProvider } from "../../context/SocketContext";
import Profile from "../profile/Profile";
const AddListing = lazy(() => import('../../components/listing/AddListing'));

const Dashboard = () => {
  return (
  <SocketProvider>
  <div className="dashboard-wrapper">
  <div className="dashboard-sidebar">
  <SideBar/>
  </div>
  <div className="dashboard-content">
  <Routes>
  <Route path="/" element={<Summary/>}/>
  <Route path="/favourites/*" element={<Favourites/>}/>
  <Route path="/chats/*" element={<ChatContainer/>}/>
  <Route path="/listings/*" element={   <Suspense fallback={<DLoader/>}>
  <Listings/>
      </Suspense>}/>
  <Route path="/edit/:listingId" element={<Suspense fallback={<DLoader/>}><AddListing/></Suspense>}/>
  <Route path="/detail/:listingId" element={<Suspense fallback={<DLoader/>} ><SinglePage/></Suspense>}/>
  <Route path="/explore/*" element={<Suspense fallback={<DLoader/>}><Explore/></Suspense>}/>
  <Route path="/profile" element={<Suspense fallback={<DLoader/>}><Profile/></Suspense>}/>
  </Routes>
  </div>
  </div>
  </SocketProvider>
);
};
export default Dashboard;
