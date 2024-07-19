import React from 'react'
import './Listing.css'

const Listing = ({ 
  lid,
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
  rooms 
}) => {

  
    return (
      <>
      <div>
        <div className="card">
          <div className="myCourosal cimg">
            <div id={lid} class="carousel slide">
              <div className="carousel-indicators">
                <button
                  type="button"
                  data-bs-target={`#${lid}`}
                  data-bs-slide-to="0"
                  className="active"
                  aria-current="true"
                  aria-label="Slide 1"
                ></button>
                <button
                  type="button"
                  data-bs-target={`#${lid}`}
                  data-bs-slide-to="1"
                  aria-label="Slide 2"
                ></button>
                <button
                  type="button"
                  data-bs-target={`#${lid}`}
                  data-bs-slide-to="2"
                  aria-label="Slide 3"
                ></button>
              </div>
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSJllRGMhuXDebMdWM27dLzT4DKQvglmIhaA&s"
                    className="d-block cimg"
                    alt="..."
                  />
                </div>
                <div className="carousel-item">
                  <img
                    src="https://freepngimg.com/save/35427-rent-hd/460x300"
                    className="d-block cimg"
                    alt="..."
                  />
                </div>
                <div className="carousel-item">
                  <img
                    src="https://www.citizen-times.com/gcdn/presto/2021/10/19/NGAG/ee85da7c-a1fd-4f35-a831-ad54381b37a4-RENTAL5.jpg?width=660&height=410&fit=crop&format=pjpg&auto=webp"
                    className="d-block cimg"
                    alt="..."
                  />
                </div>
              </div>
              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target={`#${lid}`}
                data-bs-slide="prev"
              >
                <span
                  className="carousel-control-prev-icon"
                  aria-hidden="true"
                ></span>
                <span class="visually-hidden">Previous</span>
              </button>
              <button
                className="carousel-control-next"
                type="button"
                data-bs-target={`#${lid}`}
                data-bs-slide="next"
              >
                <span
                  className="carousel-control-next-icon"
                  aria-hidden="true"
                ></span>
                <span class="visually-hidden">Next</span>
              </button>
            </div>
          </div>

          <div className="card-body">
            <h5 className="card-title">
              {type} : {title}
            </h5>
            <p className="card-text">{description}</p>
            <p className="card-text">
              <hr />
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

            {type == "Room" ? (
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
            ) : (
              <></>
            )}

            {type == "Flat" ? (
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
            ) : (
              <></>
            )}
            {type == "House" ? (
              <>
                {" "}
                <p className="card-text">
                  <span style={{ fontWeight: "Bold" }}>Garden: </span>
                  {garden ? "Available" : "N/A"}
                </p>
                <p className="card-text">
                  <span style={{ fontWeight: "Bold" }}>Rooms: </span>
                  {rooms}
                </p>
              </>
            ) : (
              <></>
            )}

            <div style={{ display: "flex" }}>
              <a href="#" class="btn btn-success">
                Edit
              </a>
              <a href="#" class="btn btn-danger">
                Delete
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Listing