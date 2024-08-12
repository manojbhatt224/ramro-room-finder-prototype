import React from 'react'
import { FcSearch } from "react-icons/fc";
import './Filter.css'

const Filter = () => {
  return (
<div className="filter">
    {/* <h1>Search results for <b>London</b></h1> */}
    <hr/>
    <div className="top">
    <div className="item">
            <label htmlFor="city">Location</label>
            <input type="text" id="city" name="city" placeholder="City Location"/>
            </div>
    </div>
    <div className="bottom">
        <div className="item">
            <label htmlFor="type">Type</label>
            <select id="type" name="type">
                <option value="buy">Buy</option>
                <option value="rent">Rent</option>
                <option value="rent">Any</option>
                </select>
        </div>
        <div className="item">
            <label htmlFor="property">Listing</label>
            <select id="property" name="property">
            <option value="any">Any</option>
                <option value="room">Room</option>
                <option value="flat">Flat</option>
                <option value="house">House</option>
                </select>
        </div>
        <div className="item">
            <label htmlFor="minPrice">Min Price</label>
            <input type="number" id="minPrice" name="minPrice" placeholder="any"/>
        </div>
        <div className="item">
            <label htmlFor="maxPrice">Max Price</label>
            <input type="number" id="maxPrice" name="maxPrice" placeholder="any"/>
        </div>
        <button>
        <FcSearch className="btn-img"/>
        </button>
    </div>
    <hr/>
</div>
  )
}

export default Filter