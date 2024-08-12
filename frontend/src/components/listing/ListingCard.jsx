import React from "react";
import { Link } from "react-router-dom";
import "./ListingCard.css";

const ListingCard = ({
  _id,
  type,
  title,
  description,
  price,
  area,
  parking,
  bed,
  maxPeople,
  kitchen,
  hall,
  location,
  latitude,
  longitude,
  bedrooms,
  garden,
  rooms,
  medias,
  operation,
  ownerDetails,
}) => {
  return (
    <div className="listing-card">
      <div className="image-container">
        <Link to="/dashboard/explore">
          <img
            src={`${import.meta.env.VITE_BACKEND_URL}/uploads/${medias[0]?.path
              .split("\\")
              .pop()}`}
            className="d-block cimg"
            alt=""
            loading="lazy"
          />
        </Link>
      </div>
      <div className="text-container">
        <div className="top">
          <div className="top-one">
          <h2 className="title">
          <Link to="/dashboard/explore">{title}</Link>
        </h2>
        <p className="address">
          <img src="/icons/pin.png" alt="" />
          <span>{location}</span>
        </p>
          </div>
          <div className="top-two">
 <div className="owner-wrapper">
        {ownerDetails?.photourl ? (
          <img
            src={ownerDetails?.photourl}
            alt="Profile"
            className="ld-review-img"
          />
        ) : (
          <div style={{ textAlign: "center" }} className="img-error">
            {ownerDetails?.firstName?.charAt(0).toUpperCase()}
          </div>
        )}
      </div>
          </div>
       
      </div>
        
        <div className="bottom">
          <div className="sp-sizes">
            <div className="sp-size-container">
              <div className="sp-size">
                <img src="/icons/kitchen.png" alt="" />
                Kitchen:{kitchen ? "A" : "N/A"}
              </div>
              <div className="sp-size">
                <img src="/icons/parking.png" alt="" />
                Parking:{parking ? "A" : "N/A"}
              </div>
              <div className="sp-size">
                <img src="/icons/hall.png" alt="" />
                Hall:{hall ? "A" : "N/A"}
              </div>
            </div>
            <div className="sp-size-container">
              <div className="sp-size">
                <img src="/icons/bed.png" alt="" />
                <span>Bed: {bed ? "A" : "N/A"} </span>
              </div>
              <div className="sp-size">
                <img src="/icons/room.png" alt="" />
                <span>Rooms: {rooms ? rooms : "N/A"} </span>
              </div>
              <div className="sp-size">
                <img src="/icons/size.png" alt="" />
                <span>Area: {area} sq.ft.</span>
              </div>
            </div>
            <div className="sp-size-container">
              <div className="sp-size">
                <img src="/icons/people.png" alt="" />
                <span>Max People: {maxPeople ? maxPeople : "N/A"} </span>
              </div>
            </div>
          </div>

          {/* <div className="features">
            <div className="feature">
              <img src="/icons/bed.png" alt="" />
              <span>{bedrooms} bedroom</span>
            </div>
            <div className="feature">
              <img src="/icons/bath.png" alt="" />
              <span>1 bathroom</span>
            </div>
          </div> */}
        </div>
        <div className="price-icons">
          <div className="price">Rs. {price}</div>
          <div className="icons">
            {operation && (
              <>
                {" "}
                <div className="icon">
                  <img src="/icons/edit.png" alt="" />
                </div>
                <div className="icon">
                  <img src="/icons/delete.png" alt="" />
                </div>
              </>
            )}
            <div className="icon">
              <img src="/icons/save.png" alt="" />
            </div>
            <div className="icon">
              <Link to={`/dashboard/chats/${ownerDetails?._id}`}>
                <img src="/icons/chat.png" alt="" />
              </Link>
            </div>
            <div className="icon">
              <Link to={`/dashboard/detail/${_id}`}>
                <img src="/icons/detail.png" alt="" />
              </Link>
            </div>
          </div>
        </div>
      </div>
     
    </div>
  );
};

export default ListingCard;
