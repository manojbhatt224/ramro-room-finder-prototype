import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectListing, getListing } from "../../slices/listingSlice";

import { IoNavigateCircleOutline } from "react-icons/io5";
import { FaHeart } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BiDetail } from "react-icons/bi";
import "./ListingDetail.css";
import { FaStar } from "react-icons/fa";

const ListingDetail = () => {
  const listing = useSelector(selectListing);
  const dispatch = useDispatch();
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleRating = (rate) => {
    setRating(rate);
  };

  const handleHoverRating = (rate) => {
    setHoverRating(rate);
  };

  const handleSubmit = () => {
    console.log("Submitting...");
  };

  useEffect(() => {
    const fetchListing = async () => {
      await dispatch(getListing("669f939ebb0a6675e7c226d0"));
    };
    fetchListing();
  }, []);
  return (
    <div className="listingdetail-wrapper">
      <h1>{listing?.title}</h1>
      <div
        id="carouselExampleIndicators"
        className="carousel slide ld-image-wrapper"
        data-bs-ride="carousel"
      >
        <div className="carousel-indicators">
          {listing?.medias?.map((_, index) => (
            <button
              key={index}
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to={index}
              className={index === 0 ? "active" : ""}
              aria-current={index === 0 ? "true" : "false"}
              aria-label={`Slide ${index + 1}`}
            ></button>
          ))}
        </div>
        <div className="carousel-inner">
          {listing?.medias?.map((media, index) => (
            <div
              key={index}
              className={`carousel-item ${index === 0 ? "active" : ""}`}
            >
              <img
                src={`${import.meta.env.VITE_BACKEND_URL}/uploads/${media.path
                  .split("\\")
                  .pop()}`}
                className="d-block w-100"
                alt={`Media ${index + 1}`}
                loading="lazy"
              />
            </div>
          ))}
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleIndicators"
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
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      <div className="ld-rating-container">
        <textarea
          className="ld-comment-box"
          placeholder="Write your comment here..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <div className="ld-action">
          <div className="ld-stars">
            {[1, 2, 3, 4, 5].map((star) => (
              <FaStar
                key={star}
                className={`ld-star ${
                  rating >= star || hoverRating >= star ? "ld-filled" : ""
                }`}
                onClick={() => handleRating(star)}
                onMouseEnter={() => handleHoverRating(star)}
                onMouseLeave={() => handleHoverRating(0)}
              />
            ))}
          </div>
          <button className="ld-submit-button" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>

      <div className="ld-user-reviews">
      {listing?.reviews && listing.reviews.length > 0 ? (
    listing.reviews.map((review, index) => (
      <div key={index} className="ld-review">
        {review.userDetails?.photourl ? (
          <img
            src={review.userDetails.photourl}
            alt="Profile"
            className="ld-review-img"
          />
        ) : (
          <div
            style={{ textAlign: "center" }}
            className="ld-review-error-img"
          >
            {review.userDetails?.firstName?.charAt(0).toUpperCase()}
          </div>
        )}

        <div className="ld-review-content">
          <h4 className="ld-review-name">
            {review.userDetails?.firstName} {review.userDetails?.lastName}
          </h4>
          <div className="ld-review-stars">
            {[1, 2, 3, 4, 5].map((star) => (
              <FaStar
                key={star}
                className={`ld-review-star ${
                  review.rating >= star ? "ld-filled" : ""
                }`}
              />
            ))}
          </div>
          <p className="ld-review-comment">{review.comment}</p>
        </div>
      </div>
    ))
  ) : (
    <h3>No Reviews Yet</h3>
  )}
</div>   
     </div>
    
  );
};

export default ListingDetail;
