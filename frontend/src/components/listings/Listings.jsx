import React, { useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Listing from "../listing/Listing";
import "./Listings.css";
import AddListing from "../listing/AddListing";

import { useSelector,useDispatch } from "react-redux";
import {getMyListings, selectFetchError, selectListings, selectFetchLoading, setFetchError } from "../../slices/listingSlice";
import { Oval } from "react-loader-spinner";
import Swal from "sweetalert2";
const Listings = () => {
  const dispatch=useDispatch();
  const loading=useSelector(selectFetchLoading);
  const error=useSelector(selectFetchError)
  const listings=useSelector(selectListings)
useEffect(()=>{
dispatch(getMyListings());

},[])
useEffect(() => {
  if (error) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: error,
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(setFetchError(null));
      }
      else{
        dispatch(setFetchError(null));
      } 
    });
  }
  // if (success) {
  //   Swal.fire({
  //     title: "Congratulations!",
  //     text: success,
  //     icon: "success"
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       resetForm();
  //       dispatch(setSuccess(null));
  //       setIsSignUp(false);
  //     }
  //     else{
  //       resetForm();
  //       dispatch(setSuccess(null));
  //       setIsSignUp(false);
  //     }
       
  //   });
  // }
}, [error]);
  return (
    <>
<Link to="/dashboard/listings/edit">Edit</Link><br/>
<Link to="/dashboard/listings/">Add</Link>
      <div className="listing-operation">
      <Routes>
  <Route path="/" element={<AddListing/>}/>
  <Route path="/edit" element={<h1>Edit</h1>}/>
  </Routes>
      </div>
      <div className="mylistings">
        <div className="listings-head">
        <h1>My Listings</h1>
        <hr style={{color:"green"}}/>
        </div>
        <div className="listings">
          {error? <h1>{error}</h1>: <></>}
        {loading ? (
        <div className="button-content">
          <Oval visible={true} height="200" color="#000000" ariaLabel="oval-loading" />
        </div>): (listings && listings?.length>0? listings.map((listing)=>(<Listing key={listing._id} {...listing} operation={true}/> )) :<h5>You have no listings.</h5>)}
        </div>
      </div>
    </>
  );
};

export default Listings;
