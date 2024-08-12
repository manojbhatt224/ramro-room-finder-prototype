import React from 'react'
import './Review.css'
import { useSelector } from 'react-redux'
import {selectUser} from '../../slices/authSlice'
import { getTimeAgo } from '../../helpers/timeAgo';
import { FaStar } from 'react-icons/fa';

const Review = ({_id, userDetails, rating, comment,updatedAt, ownerId, setReviewForUpdate, deleteReviewwithId}) => {
  const user=useSelector(selectUser);
  const onEditClick=()=>{
    setReviewForUpdate(_id,comment, rating);
  }
  const onDelete=async ()=>{
    deleteReviewwithId(_id);
  }
  return (
    <>
    <div className="ld-review">
        {userDetails?.photourl ? (
          <img
            src={userDetails.photourl}
            alt="Profile"
            className="ld-review-img"
          />
        ) : (
          <div
            style={{ textAlign: "center" }}
            className="ld-review-error-img"
          >
            {userDetails?.firstName?.charAt(0).toUpperCase()}
          </div>
        )}

        <div className="ld-review-content">
          <h4 className="ld-review-name">
            {userDetails?.firstName} {userDetails?.lastName}
          </h4>
          <div className="ld-review-stars">
            {[1, 2, 3, 4, 5].map((star) => (
              <FaStar
                key={star}
                className={`ld-review-star ${
                  rating >= star ? "ld-filled" : ""
                }`}
              />
            ))}
            {(user?._id.toString() == userDetails?._id.toString() || user?._id.toString()==ownerId?.toString()) && <div className="ld-review-actions"><div className="review-actions-icon"><img src="/icons/edit.png"  alt="E" onClick={onEditClick}/>  </div><div className="review-actions-icon"><img src="/icons/delete.png" alt="D" onClick={onDelete}/></div></div> }
          </div>
          <p className="ld-review-comment">{comment} <span className="ld-review-timeago">{getTimeAgo(updatedAt)}</span></p>
        </div>
      </div>
    
   
    </>
  )
}

export default Review