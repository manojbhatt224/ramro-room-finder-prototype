import React, { useEffect, useState, lazy, Suspense } from "react";

import { useSelector, useDispatch } from "react-redux";

import { selectListing, getListing } from "../../slices/listingSlice";
import {
  selectOperationError,
  selectOperationLoading,
  addReview, updateReview,
  setOperationError,
} from "../../slices/reviewSlice";
import { useParams } from "react-router-dom";

import "./ListingDetail.css";
import { FaStar } from "react-icons/fa";
import {Oval} from 'react-loader-spinner'
import Review from "../review/Review";
import Swal from "sweetalert2";

const ListingDetail = () => {
  const { listingId } = useParams();
  const [updateState, setUpdateState]=useState(false);
  const [reviewId, setReviewId]=useState(null);
  const addReviewError = useSelector(selectOperationError);
  const addReviewLoading = useSelector(selectOperationLoading);
  const listing = useSelector(selectListing);
  const dispatch = useDispatch();
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");

  const resetStates=()=>{
    setUpdateState(false);
    setRating(0);
    setComment('');
  }
  const setUpdateData=(reviewId, comment, rating)=>{
    setUpdateState(true);
    setComment(comment);
    setRating(rating);
    setReviewId(reviewId);
  }
  const handleRating = (rate) => {
    setRating(rate);
  };

  const handleHoverRating = (rate) => {
    setHoverRating(rate);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  if (rating && comment) {
    if (!updateState){
      await dispatch(addReview({ listingId, comment, rating }));
    }
    else{
      if(!reviewId){
        console.log("No review id!");
      }
      else
      {
        console.log(reviewId, comment, rating);
      await dispatch(updateReview({id:reviewId, updateData: {comment, rating, listingId}}))
      }

    }
      resetStates();
      fetchListing();
    } else {
      Swal.fire({
        text: "Rating and comment needed!",
      }).then((result) => {
        if (result.isConfirmed) {
          return;
        } else {
          return;
        }
      });
    }
  };
  const fetchListing = async () => {
    await dispatch(getListing(listingId));
  };
  useEffect(() => {
    if (addReviewError) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: addReviewError,
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(setOperationError(null));
        } else {
          dispatch(setOperationError(null));
        }
      });
    }
  }, [addReviewError]);

  useEffect(() => {
    fetchListing();
  }, []);
  return (
    <div className="listingdetail-wrapper">
      <h1>
        {listing?.type} : {listing?.title}
      </h1>
      <div className="listing-owner-info">
        <h3>Owner Information</h3>
        <p>
          Name: {listing?.ownerDetails?.firstName}{" "}
          {listing?.ownerDetails?.lastName}
        </p>
        <p>Email: {listing?.ownerDetails?.email}</p>
      </div>
      <div className="listing-info">
        <h3>Listing Information</h3>
        <p>Description: {listing?.description}</p>
        <p>Area: {listing?.area} sq feet</p>
        {listing?.rooms && <p>Rooms: ${listing?.rooms}</p>}
        {listing?.bedrooms && <p>Bedrooms: {listing?.bedrooms}</p>}
        {listing?.maxPeople && <p>Max. People Allowed: {listing?.maxPeople}</p>}
        {listing?.kitchen && (
          <p>Kitchen: {listing?.kitchen ? "Available" : "N/A"}</p>
        )}
      </div>

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
          <button disabled={addReviewLoading} className="ld-submit-button" onClick={handleSubmit}>
            {addReviewLoading ? (
              <div className="button-content">
                <Oval
                  visible={true}
                  height="20"
                  color="#f0f0f0"
                  ariaLabel="oval-loading"
                />
              </div>
            ) : (
              <div className="button-content">{updateState? 'Update Review': 'Add Review'}</div>
            )}
          </button>
        </div>
      </div>

      <div className="ld-user-reviews">
        <h2>Reviews and ratings:</h2>
        <hr />

        {listing?.reviews && listing.reviews.length > 0 ? (
          [...listing.reviews]
            .reverse()
            .map((review, index) => <Review key={index} {...review} ownerId={listing?.ownerDetails?._id} setReviewForUpdate={setUpdateData} />)
        ) : (
          <h5>No Reviews Yet</h5>
        )}
      </div>
    </div>
  );
};

export default ListingDetail;
