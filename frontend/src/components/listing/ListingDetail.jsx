import React, { useEffect, useState, lazy, Suspense } from "react";

import { useSelector, useDispatch } from "react-redux";

import { selectListing, getListing } from "../../slices/listingSlice";
import {
  selectOperationError,
  selectOperationLoading,
  addReview, updateReview,
  setOperationError,
} from "../../slices/reviewSlice";
import { useParams, useNavigate } from "react-router-dom";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { useGoogleMaps } from "../../context/GoogleMapContext";
import { deleteListingAPI } from "../../api/listingAPI";

import "./ListingDetail.css";
import { FaStar } from "react-icons/fa";
import {Oval} from 'react-loader-spinner'
import Review from "../review/Review";
import Swal from "sweetalert2";

const ListingDetail = () => {
  const { listingId } = useParams();
  const navigate = useNavigate();
  const [updateState, setUpdateState]=useState(false);
  const [reviewId, setReviewId]=useState(null);
  const addReviewError = useSelector(selectOperationError);
  const addReviewLoading = useSelector(selectOperationLoading);
  const listing = useSelector(selectListing);
  const dispatch = useDispatch();
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const { isLoaded } = useGoogleMaps();

  const handleDeleteListing = async () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteListingAPI(listingId);
          Swal.fire("Deleted!", "Your listing has been deleted.", "success").then(() => {
            navigate("/dashboard/listings");
          });
        } catch (error) {
          Swal.fire("Error!", "Failed to delete listing.", "error");
        }
      }
    });
  };

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
    if (listingId) {
      fetchListing();
    }
  }, [listingId]);
  const resolveMediaUrl = (mediaPath) => {
    if (!mediaPath) return "";
    const normalized = mediaPath.replace(/\\/g, "/");

    if (normalized.startsWith("http")) return normalized;
    if (normalized.startsWith("/uploads/")) return `${import.meta.env.VITE_BACKEND_URL}${normalized}`;
    if (normalized.startsWith("uploads/")) return `${import.meta.env.VITE_BACKEND_URL}/${normalized}`;

    return `${import.meta.env.VITE_BACKEND_URL}/uploads/${normalized.split("/").pop()}`;
  };
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
              key={`${listing?._id}-${index}`}
              className={`carousel-item ${index === 0 ? "active" : ""}`}
            >
              <img
                src={resolveMediaUrl(media?.path)}
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

      {isLoaded ? (
        listing?.latitude && listing?.longitude ? (
          <div className="ld-map-container">
            <h3>Location on Map</h3>
            <div className="ld-map-wrapper">
              <GoogleMap
                mapContainerStyle={{ width: "100%", height: "100%", borderRadius: "8px" }}
                zoom={15}
                center={{ lat: parseFloat(listing.latitude), lng: parseFloat(listing.longitude) }}
                options={{
                  disableDefaultUI: false,
                  zoomControl: true,
                }}
              >
                <Marker 
                  position={{ lat: parseFloat(listing.latitude), lng: parseFloat(listing.longitude) }}
                  title={listing.title}
                />
              </GoogleMap>
            </div>
          </div>
        ) : (
          <div className="ld-map-container">
            <h3>Location</h3>
            <p style={{color: "#666", textAlign: "center", padding: "20px"}}>Location coordinates not available for this listing.</p>
          </div>
        )
      ) : (
        <div className="ld-map-container">
          <h3>Location</h3>
          <p style={{color: "#666", textAlign: "center", padding: "20px"}}>Loading map...</p>
        </div>
      )}

      <div className="ld-listing-actions">
        <button className="ld-btn-delete" onClick={handleDeleteListing}>Delete Listing</button>
        <button className="ld-btn-edit" onClick={() => navigate(`/dashboard/edit/${listingId}`)}>Edit Listing</button>
      </div>

      <div className="ld-user-reviews">
        <h2>Reviews and ratings:</h2>
        <hr />

        {listing?.reviews && listing.reviews.length > 0 ? (
          [...listing.reviews]
            .reverse()
            .map((review, index) => <Review key={listing._id + '-' + index} {...review} ownerId={listing?.ownerDetails?._id} setReviewForUpdate={setUpdateData} />)
        ) : (
          <h5>No Reviews Yet</h5>
        )}
      </div>
    </div>
  );
};

export default ListingDetail;
