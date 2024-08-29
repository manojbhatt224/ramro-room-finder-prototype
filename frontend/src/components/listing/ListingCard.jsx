import React from "react";
import {useDispatch, useSelector} from 'react-redux';
import {selectUser} from '../../slices/authSlice'
import { createChat } from "../../slices/chatSlice";
import { Link, useNavigate } from "react-router-dom";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin6Line } from "react-icons/ri";
import "./ListingCard.css";
import { FaHeart } from "react-icons/fa";
import { BiDetail } from "react-icons/bi";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";

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
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const myself = useSelector(selectUser);
const onChatClick=async(userId)=>{
dispatch(createChat(userId));
navigate(`/dashboard/chats`);
}

  return (
    <div className="listing-card">
      <div className="image-container">
      <div className="myCarousel">
        <div id={`carousel-${_id}`} className="carousel slide">
          <div className="carousel-indicators">
            {medias?.map((_, index) => (
              <button
                key={index}
                type="button"
                data-bs-target={`#carousel-${_id}`}
                data-bs-slide-to={index}
                className={index === 0 ? "active" : ""}
                aria-current={index === 0 ? "true" : "false"}
                aria-label={`Slide ${index + 1}`}
              ></button>
            ))}
          </div>
          <div className="carousel-inner">
            {medias?.map((media, index) => (
              <div
                key={index}  
                className={`carousel-item ${index === 0 ? "active" : ""}`}
              >
                <div className="img-wrap">
                  <img
                    src={`${
                      import.meta.env.VITE_BACKEND_URL
                    }/uploads/${media.path.split("\\").pop()}`}
                    className="d-block cimg"
                    alt={`Media ${index + 1}`}
                    loading="lazy"
                  />
                </div>
              </div>
            ))}
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target={`#carousel-${_id}`}
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target={`#carousel-${_id}`}
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
        {/* <Link to="/dashboard/explore">
          <img
            src={`${import.meta.env.VITE_BACKEND_URL}/uploads/${medias[0]?.path
              .split("\\")
              .pop()}`}
            className="d-block cimg"
            alt=""
            loading="lazy"
          />
        </Link> */}
      </div>
      <div className="text-container">
        <div className="top">
          <div className="top-one">
          <h2 className="title">
          <Link to="/dashboard/explore">{title}</Link>
        </h2>
        <p className="address">
          <img src="/icons/pin.png" alt="" />
          <span>{location?.split(',')
        .slice(0, -2)
        .join(',')
        .trim()}</span>
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
                <div className="icon">
                <CiEdit className="operation-icon text-primary" />
                </div>
                <div className="icon">
              <RiDeleteBin6Line className="operation-icon text-danger"/>
                </div>
              </>
            )}
            <div className="icon">
            <FaHeart
            style={{ color: "darkred"}}
          />
              {/* <img src="/icons/save.png" alt="" /> */}
            </div>
 
            <div className="icon">
              <Link to={`/dashboard/detail/${_id}`}>
              <BiDetail className="text-success " />
                {/* <img src="/icons/detail.png" alt="" /> */}
              </Link>
            </div>         
            {ownerDetails?._id === myself?._id ?<></>: <div className="icon" onClick={()=>{onChatClick(ownerDetails?._id)}}>
              <IoChatbubbleEllipsesOutline />
  
            </div>}
          </div>
        </div>
      </div>
     
    </div>
  );
};

export default ListingCard;
