
import './Explore.css'
import React, { useEffect, useCallback } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Listing from '../../components/listing/Listing';

import { useSelector,useDispatch } from "react-redux";
import {getAllListings,selectFetchHasMore, selectPage, selectFetchError, resetListings, selectListings, selectFetchLoading, setFetchError } from "../../slices/listingSlice";
import { Oval } from "react-loader-spinner";
import Swal from "sweetalert2";


const Explore = () => {

  const dispatch=useDispatch();
  const page=useSelector(selectPage);
  const hasMore=useSelector(selectFetchHasMore);
  const loading=useSelector(selectFetchLoading);
  const error=useSelector(selectFetchError)
  const listings=useSelector(selectListings)

  const loadMoreData = useCallback(() => {
    if (!loading && hasMore) {
      dispatch(getAllListings());
    }
    else{
      return
    }
  }, [dispatch, hasMore, loading]);

  useEffect(() => {

    dispatch(resetListings())
    
  }, [dispatch]);

  useEffect(() => {
    loadMoreData();
  }, [hasMore, loading, loadMoreData]);



const handleInfiniteScroll = useCallback(() => {
  if (
    window.innerHeight + document.documentElement.scrollTop + 1 >=
    document.documentElement.scrollHeight
  ) {
    if (!loading && hasMore) {
      loadMoreData();
    }
  }
}, [loadMoreData, loading, hasMore]);

useEffect(() => {
  window.addEventListener("scroll", handleInfiniteScroll);
  return () => window.removeEventListener("scroll", handleInfiniteScroll);
}, [handleInfiniteScroll]);


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
        <h1 style={{marginLeft:"20px"}}>Explore Available Listings</h1>
        <hr style={{color:"black"}}/>
        </div>
        <div className="listings">
          {error? <h1>{error}</h1>: <></>}
        {listings? listings.map((listing,index)=>(<Listing key={index} {...listing} operation={false}/> )) :<h1>No Data</h1>}
        </div>
        {loading && <div style={{width:"100%", display:"flex", justifyContent:"center", alignItems:"center"}}><Oval visible={true} height="200" color="#000000" ariaLabel="oval-loading" /></div>}
        {!hasMore && <div className="text-center" style={{width:"100%"}}>No more listings!</div>}
      </div>
    </>
  );
};


export default Explore