import * as XLSX from 'xlsx'

import React, { useEffect, useState, lazy} from 'react'
import { GoogleMap, Marker, InfoWindow} from '@react-google-maps/api';
import './ExploreMap.css'

import DLoader from '../loaderDashboard/dLoader';
import { useGoogleMaps } from '../../context/GoogleMapContext';

const ExploreMap = ({listing}) => {
console.log(listing)
  const [selected, setSelected] = useState(null);
  const {isLoaded}=useGoogleMaps();
  
   
    const containerStyle = {
        width: '100%',
        height: '100%'
      };
      
      const center = listing ? {
        lat: listing?.latitude,
        lng: listing?.longitude,
      } : { lat: 0, lng: 0 };
    
    
     
  return (
    (isLoaded && listing )? (
      <GoogleMap
      mapContainerStyle={containerStyle}
      zoom={13}
      center={center}
    >
      {
        <Marker
          key={listing?._id}
          position={{ lat: listing.latitude, lng: listing.longitude }}
          // icon={createCustomMarkerIcon(listing.price)}
          label={{text:`${listing.price}`,color:'#fff', fontSize:'12px',className:'marker-label'}}
          onClick={() => setSelected(listing)}
          color="green"
        />
      }

      {selected && (
        <InfoWindow
          position={{ lat: selected.latitude, lng: selected.longitude }}
          onCloseClick={() => setSelected(null)}
        >
          <div>
            <h2>{selected?.title}</h2>
            <p>{selected?.price}</p>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
    ) : <DLoader/>
  )
}

export default ExploreMap






