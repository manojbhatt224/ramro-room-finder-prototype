import React, { useEffect, useState } from "react";
import "./SinglePage.css";
import Map from "../../components/map/SingleMap";
import Slider from "../../components/slider/Slider";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { selectListing, getListing } from "../../slices/listingSlice";
import { FaStar } from "react-icons/fa";
import Review from "../../components/review/Review";
import {
  addReview,
  deleteReview,
  selectOperationError,
  selectOperationLoading,
  updateReview,
} from "../../slices/reviewSlice";
import { Oval } from "react-loader-spinner";

const SinglePage = () => {
  const { listingId } = useParams();
  const [updateState, setUpdateState] = useState(false);
  const [reviewId, setReviewId] = useState(null);
  const addReviewError = useSelector(selectOperationError);
  const addReviewLoading = useSelector(selectOperationLoading);
  const listing = useSelector(selectListing);
  const dispatch = useDispatch();
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");

  const resetStates = () => {
    setUpdateState(false);
    setRating(0);
    setComment("");
  };
  const handleDeleteAction = async (reviewId) => {
    if (reviewId) {
      await dispatch(deleteReview(reviewId));
      resetStates();
      fetchListing();
    } else {
      Swal.fire({
        text: "No review id to delete.",
      }).then((result) => {
        if (result.isConfirmed) {
          return;
        } else {
          return;
        }
      });
    }
  };

  const setUpdateData = async (reviewId, comment, rating) => {
    setUpdateState(true);
    setComment(comment);
    setRating(rating);
    setReviewId(reviewId);
  };
  const handleRating = (rate) => {
    setRating(rate);
  };

  const handleHoverRating = (rate) => {
    setHoverRating(rate);
  };

  const fetchListing = async () => {
    await dispatch(getListing(listingId));
    console.log(listing);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (rating && comment) {
      if (!updateState) {
        await dispatch(addReview({ listingId, comment, rating }));
      } else {
        if (!reviewId) {
          console.log("No review id!");
        } else {
          console.log(reviewId, comment, rating);
          await dispatch(
            updateReview({
              id: reviewId,
              updateData: { comment, rating, listingId },
            })
          );
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
    <div className="single-page">
      <div className="sp-details">
        <div className="sp-wrapper">
          <Slider image={listing?.medias} />
          <div className="sp-info">
            <div className="sp-top">
              <div className="sp-post">
                <h1>{listing?.title}</h1>
                <div className="sp-address">
                  <img src="/icons/pin.png" alt="" />
                  <span>{listing?.location.split(',')
        .slice(0, -2)
        .join(',')
        .trim()}</span>
                </div>
                <div className="sp-price">Rs {listing?.price}</div>
              </div>
              <div className="sp-user">
                {listing?.ownerDetails?.photourl ? (
                  <img
                    src={listing?.ownerDetails?.photourl}
                    alt="Profile"
                    className="ld-review-img"
                  />
                ) : (
                  <div style={{ textAlign: "center" }} className="img-error">
                    {listing?.ownerDetails?.firstName?.trim().charAt(0).toUpperCase()}
                  </div>
                )}
                <span>
                  {listing?.ownerDetails?.firstName +
                    " " +
                    listing?.ownerDetails?.lastName}
                </span>
              </div>
            </div>
            <div className="sp-bottom">{listing?.description}</div>
          </div>
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
            <button
              disabled={addReviewLoading}
              className="ld-submit-button"
              onClick={handleSubmit}
            >
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
                <div className="button-content">
                  {updateState ? "Update Review" : "Add Review"}
                </div>
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
              .map((review, index) => (
                <Review
                  key={index}
                  {...review}
                  ownerId={listing?.ownerDetails?._id}
                  setReviewForUpdate={setUpdateData}
                  deleteReviewwithId={handleDeleteAction}
                />
              ))
          ) : (
            <h5>No Reviews Yet</h5>
          )}
        </div>
      </div>
      <div className="sp-features">
        <div className="sp-wrapper">
          <p className="sp-title">General</p>
          <div className="sp-list-vertical">
            <div className="sp-feature">
              <img src="/icons/utility.png" alt="" />
              <div className="sp-feature-text">
                <span>Utitlities</span>
                <p>Renter is reponsibile.</p>
              </div>
            </div>
            <div className="sp-feature">
              <img src="/icons/pet.png" alt="" />
              <div className="sp-feature-text">
                <span>Pets Policy</span>
                <p>Pets Allowed</p>
              </div>
            </div>
            <div className="sp-feature">
              <img src="/icons/fee.png" alt="" />
              <div className="sp-feature-text">
                <span>Property Fees</span>
                <p>Must have 3x the rent in total household income.</p>
              </div>
            </div>
          </div>
          <p className="sp-title">Features</p>
          <div className="sp-sizes">
            <div className="sp-size-container">
              <div className="sp-size">
              <img src="/icons/kitchen.png" alt="" />
                Kitchen:{listing?.kitchen ? "A" : "N/A"}
              </div>
              <div className="sp-size">
                <img src="/icons/parking.png" alt="" />
                Parking:{listing?.parking ? "A" : "N/A"}
              </div>
              <div className="sp-size">
              <img src="/icons/hall.png" alt="" />
              Hall:{listing?.hall ? "A" : "N/A"}
            </div>
              
            </div>
            <div className="sp-size-container">
            <div className="sp-size">
              <img src="/icons/bed.png" alt="" />
              <span>Bed: {listing?.bed ? "A" : "N/A"} </span>
            </div>
            <div className="sp-size">
              <img src="/icons/room.png" alt="" />
              <span>Rooms: {listing?.rooms ? listing?.rooms : "N/A"} </span>
            </div>
            <div className="sp-size">
                <img src="/icons/size.png" alt="" />
                <span>Area: {listing?.area} sq.ft.</span>
              </div>
         
            </div>
            <div className="sp-size-container">
            <div className="sp-size">
              <img src="/icons/people.png" alt="" />
              <span>Max People: {listing?.maxPeople ? listing.maxPeople : "N/A"} </span>
            </div>
            </div>

     
          </div>
          <p className="sp-title">Nearby Places</p>
          <div className="sp-list-horizontal">
            <div className="sp-feature">
              <img src="/icons/fee.png" alt="" />
              <div className="sp-feature-text">
                <span>School</span>
                <p>250m away</p>
              </div>
            </div>
            <div className="sp-feature">
              <img src="/icons/fee.png" alt="" />
              <div className="sp-feature-text">
                <span>Bus Stop</span>
                <p>100m away</p>
              </div>
            </div>
            <div className="sp-feature">
              <img src="/icons/fee.png" alt="" />
              <div className="sp-feature-text">
                <span>Restaurant</span>
                <p>300m away</p>
              </div>
            </div>
          </div>
          <p className="sp-title">Location</p>
          <div className="sp-mapcontainer">
            {/* <Map listing={listing} /> */}
          </div>
          <div className="sp-buttons">
            <button>
              <img src="/icons/chat.png" alt="" />
              Message
            </button>
            <button>
              <img src="/icons/save.png" alt="" />
              Add to Favourite
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SinglePage;
