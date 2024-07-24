
import './Explore.css'
import React, { useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Listing from '../../components/listing/Listing';

import { useSelector,useDispatch } from "react-redux";
import {getAllListings, selectFetchError, selectListings, selectFetchLoading, setFetchError } from "../../slices/listingSlice";
import { Oval } from "react-loader-spinner";
import Swal from "sweetalert2";
const Explore = () => {
  const dispatch=useDispatch();
  const loading=useSelector(selectFetchLoading);
  const error=useSelector(selectFetchError)
  const listings=useSelector(selectListings)
useEffect(()=>{
dispatch(getAllListings());

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
}, [error]);
  return (
    <>
      <div className="mylistings">
        <div className="listings-head">
        <h1>Explore Available Listings</h1>
        <hr style={{color:"green"}}/>
        </div>
        <div className="listings">
          {error? <h1>{error}</h1>: <></>}
        {loading ? (
        <div className="button-content">
          <Oval visible={true} height="200" color="#000000" ariaLabel="oval-loading" />
        </div>): (listings? listings.map((listing)=>(<Listing key={listing._id} {...listing}/> )) :<h1>No Data</h1>)}
        </div>
      </div>
    </>
  );
};


export default Explore