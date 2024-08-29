import React, { useEffect, useState} from "react";
import { useSelector,useDispatch } from "react-redux";
import { getAllListings, selectListings, setFilters, clearFilters} from "../../slices/listingSlice";
import { FcSearch } from "react-icons/fc";
import { useDebounce } from "../../helpers/useDebounce";
import axios from "axios";
import "./Filter.css";

const Filter = () => {
  const [location, setLocation] = useState("");
  const [minPrice, setMinPrice]=useState('');
  const [maxPrice, setMaxPrice]=useState('');
  const dispatch = useDispatch();
  const [suggestions, setSuggestions]=useState(true);

  const listings=useSelector(selectListings);
  const [locations, setLocations] = useState([]);
  // Use the custom hook for debouncing
  const debouncedLocation = useDebounce(location, 200);

  // Function to handle input change
  const handleMinPriceChange=(e)=>{
    setMinPrice(e.target.value);
  }
  const handleMaxPriceChange=(e)=>{
    setMaxPrice(e.target.value);
  }
  useEffect(()=>{
  if(!location && !minPrice && !maxPrice){
    dispatch(clearFilters());
    dispatch(getAllListings());
  }
  },[location, minPrice, maxPrice])
  const handleInputChange = (event) => {
    if (event.target.value===null || event.target.value===''){
      dispatch(clearFilters());
      dispatch(getAllListings());
    }

    setLocation(event.target.value);
    setSuggestions(true);

  };
  // Function to fetch locations based on the query
  useEffect(() => {
    if (debouncedLocation.length > 0) {
      axios
        .get(`http://localhost:5000/api/location/search/?q=${location}`)
        .then((response) => {
          setLocations(response.data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    } else {
      setLocations([]);
    }
  }, [debouncedLocation]);
  // Function to handle location click
  const handleLocationClick = async (location) => {
    setLocation(location.addressDetail);
    setSuggestions(false);
  };
  const onSearch = async () => {
    await dispatch(setFilters({location,minPrice,maxPrice}))
    dispatch(getAllListings());
  };
  return (
    <div className="filter">
   

      <div className="bottom">
        <div className="item">
        <div style={{ position: "relative" }} className="item">
          <label htmlFor="city">Location</label>
          <input
          style={{width:"300px"}}
            type="text"
            id="city"
            name="city"
            placeholder="City Location"
            value={location}
            onChange={handleInputChange}
          />
        </div>
        {locations?.length > 0 && suggestions===true && (
          <ul className="location-list">
            {locations?.map((location, index) => (
              <li style={{listStyleType:"none"}} key={index} onClick={() => handleLocationClick(location)}>
                {location.addressDetail
                  .split(",")
                  .slice(0, -2)
                  .join(",")
                  .trim()}
              </li>
            ))}
          </ul>
        )}
        </div>
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
          <input
            type="number"
            id="minPrice"
            name="minPrice"
            onChange={handleMinPriceChange}
            placeholder="any"
          />
        </div>
        <div className="item">
          <label htmlFor="maxPrice">Max Price</label>
          <input
            type="number"
            id="maxPrice"
            name="maxPrice"
            onChange={handleMaxPriceChange}
            placeholder="any"
          />
        </div>
        <button disabled={!location && !minPrice && ! maxPrice} onClick={onSearch}>
          <FcSearch className="btn-img" />
        </button>
      </div>
    </div>
  );
};

export default Filter;
