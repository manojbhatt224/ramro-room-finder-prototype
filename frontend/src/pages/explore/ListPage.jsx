import React, { useCallback, useEffect, useRef, useState } from "react";
import "./ListPage.css";
import Filter from "../../components/filter/Filter";
import ListingCard from "../../components/listing/ListingCard";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllListings,
  selectFetchError,
  resetListings,
  selectFetchHasMore,
  selectFetchLoading,
  selectListings,
  selectPage,
} from "../../slices/listingSlice";
import Swal from "sweetalert2";
import { Oval } from "react-loader-spinner";
import ExploreMap from "../../components/map/ExploreMap";

const ListPage = () => {
  const listContainerRef = useRef(null);
  const dispatch = useDispatch();
  const hasMore = useSelector(selectFetchHasMore);
  const loading = useSelector(selectFetchLoading);
  const error = useSelector(selectFetchError);
  const listings = useSelector(selectListings);

  const loadMoreData = useCallback(() => {
    const loadingValue = loading;
    const hasMoreValue = hasMore;
   
    if (!loadingValue && hasMoreValue) {
      dispatch(getAllListings());
   
    } else {
      return;
    }
  }, [dispatch, hasMore, loading]);

  useEffect(() => {
    const clearListings = async () => {
      await dispatch(resetListings());
    };

    clearListings();
  }, [dispatch]);

  useEffect(() => {
    loadMoreData();
  }, [hasMore, loading, loadMoreData]);

  const handleInfiniteScroll = useCallback(() => {
    const listContainer = listContainerRef.current;
    if (
      listContainer.scrollTop + listContainer.clientHeight + 1 >=
      listContainer.scrollHeight
    ) {
      if (!loading && hasMore) {
        loadMoreData();
      }
    }
  }, [loadMoreData, loading, hasMore]);

  useEffect(() => {
    const listContainer = listContainerRef.current;
    listContainer.addEventListener("scroll", handleInfiniteScroll);
    return () =>
      listContainer.removeEventListener("scroll", handleInfiniteScroll);
  }, [handleInfiniteScroll]);

  useEffect(() => {
    if (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error,
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(setFetchError(null));
        } else {
          dispatch(setFetchError(null));
        }
      });
    }
  }, [error]);
  const filterListing= (filter)=>{
    dispatch(getAllListings(filter));
  }
  return (
    <>
  <div className="list-page-wrapper">
    <div className="filter-wrapper">
    <Filter />
    </div>
    <div className="list-page">
      <div className="filter-list-container">
        <div className="list-container" ref={listContainerRef}>
          {error ? <h1>{error}</h1> : <></>}
          {listings ? (
            listings.map((listing, index) => (
              <ListingCard key={index} {...listing} operation={false} />
            ))
          ) : (
            <h1>No Data</h1>
          )}
          {loading && (
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Oval
                visible={true}
                height="200"
                color="#000000"
                ariaLabel="oval-loading"
              />
            </div>
          )}
          {!hasMore && (
            <div className="text-center" style={{ width: "100%" }}>
              {listings.length>0 ? "No more listings." : "No Listings at the moment!"}
            </div>
          )}
        </div>
      </div>

      <div className="map-container">
      {listings.length>0 ?   <ExploreMap listings={listings}/>: <h3>No listings available at the moment!</h3>}
      </div>
    </div>
  </div>

    </>
  );
};

export default ListPage;
