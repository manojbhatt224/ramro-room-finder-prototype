import React from "react";
import { Link } from "react-router-dom";
import { IoNavigateCircleOutline } from "react-icons/io5";
import { FaHeart } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BiDetail } from "react-icons/bi";
import "./Listing.css";


const Listing = ({
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
  bedrooms,
  garden,
  rooms,
  medias,
  operation,
  ownerDetails
}) => {
  const resolveMediaUrl = (mediaPath) => {
    if (!mediaPath) return "";
    const normalized = mediaPath.replace(/\\/g, "/");

    if (normalized.startsWith("http")) return normalized;
    if (normalized.startsWith("/uploads/")) return `${import.meta.env.VITE_BACKEND_URL}${normalized}`;
    if (normalized.startsWith("uploads/")) return `${import.meta.env.VITE_BACKEND_URL}/${normalized}`;

    return `${import.meta.env.VITE_BACKEND_URL}/uploads/${normalized.split("/").pop()}`;
  };

  return (
    <>
    <div className="card">
      <div className="myCarousel">
        <div id={`carousel-${_id}`} className="carousel slide">
          <div className="carousel-indicators">
            {medias.map((_, index) => (
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
            {medias.map((media, index) => (
              <div
                key={`${_id}-${index}`}
                className={`carousel-item ${index === 0 ? "active" : ""}`}
              >
                <div className="img-wrap">
                  <img
                    src={resolveMediaUrl(media?.path)}
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
      <div className="card-body">
        <div className="header-wrapper">
            <div className="price-value">
            <h1 >Rs.<u>{price}</u></h1>
            </div>
          <h2>
            {type}: {title}
          </h2>
          
        </div>
        <div className="description-wrapper">
        <p className="card-text">{description}</p>
        </div>
        
      
        <div className="card-options">
        
          {operation && (
            <>
              <a href="#">
              <CiEdit className="operation-icon text-primary" />
              </a>
              <a href="#" >
              <RiDeleteBin6Line className="operation-icon text-danger"
          />
              </a>
            </>
          )}
           <Link to={`/dashboard/detail/${_id}`} >
           <BiDetail className="operation-icon text-success " />
          </Link>              
            <IoNavigateCircleOutline className="operation-icon text-dark"
          />
      
     

        </div>

        <div className="favourite-wrapper">
          <FaHeart
            style={{ color: "darkred", height: "30px", width: "30px" }}
          />
        </div>
        <div className="owner-wrapper">
        {ownerDetails?.photourl ? (
          <img
            src={ownerDetails?.photourl}
            alt="Profile"
            className="ld-review-img"
          />
        ) : (
          <div
            style={{ textAlign: "center" }}
            className="img-error"
          >
            {ownerDetails?.firstName?.charAt(0).toUpperCase()}
          </div>
        )}
        </div>
      </div>
    </div>
    </>
  );
};

export default Listing;
