import React from "react";
import Listing from "../listing/Listing";
import "./Listings.css";
const Listings = () => {
  const listingData = {
    lid:1,
    type: "Flat",
    title: "Beautiful City Center Apartment",
    description: "A beautiful apartment located in the heart of the city.",
    price: 1200,
    area: 750,
    parking: false,
    bed: true,
    maxPeople: 4,
    kitchen: true,
    hall: false,
    bedrooms: 2,
    garden: false,
    rooms: 3,
  };
  const listingData2 = {
    lid:2,
    type: "Room",
    title: "Beautiful City Center Apartment",
    description: "A beautiful apartment located in the heart of the city.",
    price: 1200,
    area: 750,
    parking: false,
    bed: true,
    maxPeople: 4,
    kitchen: true,
    hall: false,
    bedrooms: 2,
    garden: false,
    rooms: 3,
  };
  const listingData3 = {
    lid:3,
    type: "House",
    title: "Beautiful City Center Apartment",
    description: "A beautiful apartment located in the heart of the city.",
    price: 1200,
    area: 750,
    parking: false,
    bed: true,
    maxPeople: 4,
    kitchen: true,
    hall: false,
    bedrooms: 2,
    garden: false,
    rooms: 3,
  };
  return (
    <>
      <div className="mylistings">
        <Listing {...listingData}/>
        <Listing {...listingData2}/>
        <Listing {...listingData3}/>
      </div>
    </>
  );
};

export default Listings;
