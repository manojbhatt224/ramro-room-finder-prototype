import React from 'react'
import { MdAddLocationAlt } from "react-icons/md";

const MapAddInfoWindow = ({location, onAddClick}) => {
    const confirmLocation=()=>{
        console.log("This is location", location);
        onAddClick(location);
    }
  return (
    <div>
            <p>House No: {location?.houseNo}</p>
            <p>{location?.fullAddress?.split(',')
        .slice(0, -2)
        .join(',')
        .trim()}</p>
     <MdAddLocationAlt style={{height:"30px",width:"30px", backgroundColor:"#f0f0f0"}} onClick={confirmLocation} />
    </div>
  )
}

export default MapAddInfoWindow