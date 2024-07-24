import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../slices/authSlice";
import "./Dashboard.css"
import SideBar from "../../components/sidebar/SideBar";
import {Routes, Route}from 'react-router-dom'
import Summary from "../summary/Summary";
import Listings from "../../components/listings/Listings";
import Explore from "../explore/Explore";
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
  <Route path="/listings/*" element={<Listings/>}/>
  <Route path="/explore/*" element={<Explore/>}/>
  </Routes>
  </div>
  </div>
);
};
export default Dashboard;
