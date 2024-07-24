import React from 'react'
import './Listing.css'

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
  medias 
}) => {

  
  return (
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
                className={index === 0 ? 'active' : ''}
                aria-current={index === 0 ? 'true' : 'false'}
                aria-label={`Slide ${index + 1}`}
              ></button>
            ))}
          </div>
          <div className="carousel-inner">
            {medias.map((media, index) => (
              <div 
                key={index} 
                className={`carousel-item ${index === 0 ? 'active' : ''}`}
              >
                <div className="img-wrap">
                <img 
                  src={`http://192.168.1.75:5000/uploads/${media.path.split('\\').pop()}`}
                  className="d-block cimg" 
                  alt={`Media ${index + 1}`} 
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
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target={`#carousel-${_id}`}
            data-bs-slide="next"
          >
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>

      <div className="card-body">
        <h5 className="card-title">
          {type} : {title}
        </h5>
        <p className="card-text">{description}</p>
        <p className="card-text">
          <span style={{ fontWeight: "Bold" }}>Price: </span>
          Rs.{price} /-
        </p>
        <p className="card-text">
          <span style={{ fontWeight: "Bold" }}>Area: </span>
          {area}
        </p>
        <p className="card-text">
          <span style={{ fontWeight: "Bold" }}>Parking: </span>
          {parking ? "Available" : "N/A"}
        </p>

        {type === "Room" && (
          <>
            <p className="card-text">
              <span style={{ fontWeight: "Bold" }}>Bed: </span>
              {bed ? "Available" : "N/A"}
            </p>
            <p className="card-text">
              <span style={{ fontWeight: "Bold" }}>Allowed People: </span>
              {maxPeople}
            </p>
          </>
        )}

        {type === "Flat" && (
          <>
            <p className="card-text">
              <span style={{ fontWeight: "Bold" }}>Allowed People: </span>
              {maxPeople}
            </p>
            <p className="card-text">
              <span style={{ fontWeight: "Bold" }}>Kitchen: </span>
              {kitchen ? "Available" : "N/A"}
            </p>
            <p className="card-text">
              <span style={{ fontWeight: "Bold" }}>Hall: </span>
              {hall ? "Available" : "N/A"}
            </p>
            <p className="card-text">
              <span style={{ fontWeight: "Bold" }}>Bed Rooms: </span>
              {bedrooms}
            </p>
          </>
        )}

        {type === "House" && (
          <>
            <p className="card-text">
              <span style={{ fontWeight: "Bold" }}>Garden: </span>
              {garden ? "Available" : "N/A"}
            </p>
            <p className="card-text">
              <span style={{ fontWeight: "Bold" }}>Rooms: </span>
              {rooms}
            </p>
          </>
        )}

        <div style={{ display: "flex" }}>
          <a href="#" className="btn btn-success">
            Edit
          </a>
          <a href="#" className="btn btn-danger">
            Delete
          </a>
        </div>
      </div>
    </div>
  );
};

export default Listing