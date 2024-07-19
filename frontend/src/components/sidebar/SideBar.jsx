import React, { useState } from 'react'
import { TbLayoutSidebarLeftCollapseFilled, TbLayoutSidebarRightCollapseFilled } from "react-icons/tb";
import { Link } from 'react-router-dom'; // Import Link if you're using react-router
import { MdDashboard } from "react-icons/md";
import { CiSettings } from "react-icons/ci";
import { FaHouseUser } from "react-icons/fa";
import { TbBrandBooking } from "react-icons/tb";
import './SideBar.css'; // Import your custom CSS for styling

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div style={{ marginLeft: "0", marginTop:"0px", display: "flex", flexDirection: "row" }}>
      {/* Toggle button */}
      <button className="toggle-btn" onClick={toggleSidebar}>
        {isOpen ? <TbLayoutSidebarLeftCollapseFilled/> : <TbLayoutSidebarRightCollapseFilled/>}
      </button>

      {/* Sidebar */}
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="nav flex-column nav-pills">
          <Link to="/dashboard" className="nav-link text-primary fs-5 my-1" aria-current="page">
            <MdDashboard className="fs-2" />
            <span className="ms-2 d-none d-sm-inline">Dashboard</span>
          </Link>
          <Link to="/dashboard/listings" className="nav-link text-primary fs-5 my-1" aria-current="page">
            <FaHouseUser className="fs-2" />
            <span className="ms-2 d-none d-sm-inline">Listings</span>
          </Link>
          <a href="#" className="nav-link text-primary fs-5 my-1" aria-current="page">
            <TbBrandBooking className="fs-2" />
            <span className="ms-2 d-none d-sm-inline">Bookings</span>
          </a>
          <a href="#" className="nav-link text-primary fs-5 my-1" aria-current="page">
            <CiSettings className="fs-2" />
            <span className="ms-2 d-none d-sm-inline">Settings</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
