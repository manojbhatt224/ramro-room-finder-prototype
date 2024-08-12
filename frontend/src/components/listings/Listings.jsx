import React, { useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Listing from "../listing/Listing";
import "./Listings.css";
import AddListing from "../listing/AddListing";
import Map from '../map/ExploreMap'
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
      <AddListing/>
      <div className="mylistings">
        <div className="listings-head">
        <h1 style={{marginLeft:"20px"}}>My Listings</h1>
        
        <hr style={{color:"black"}}/>
        </div>
        <div className="listings">
          {error? <h1>{error}</h1>: <></>}
          {loading && <div style={{width:"100%", display:"flex", justifyContent:"center", alignItems:"center"}}><Oval visible={true} height="200" color="#000000" ariaLabel="oval-loading" /></div>} 
          {listings && listings?.length>0 ? listings.map((listing, index)=>(<Listing key={index} {...listing} operation={true}/> )) :<h3>You have no listings.</h3>}
        </div>
      </div>
    </>
  );
};

export default Listings;
