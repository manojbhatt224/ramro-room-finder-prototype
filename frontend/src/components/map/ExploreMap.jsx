
import React, { useState, useMemo} from 'react'
import { GoogleMap, Marker, InfoWindow} from '@react-google-maps/api';
import './ExploreMap.css'

import DLoader from '../loaderDashboard/dLoader';
import { useGoogleMaps } from '../../context/GoogleMapContext';
import ListingCard from '../listing/ListingCard';


const ExploreMap = ({listings}) => {
console.log(listings)
  const [selected, setSelected] = useState(null);


  const [zone, setZone]=useState([]);
  const {isLoaded}=useGoogleMaps();
  
   
    const containerStyle = {
        width: '100%',
        height: '100%'
      };
      
      const center = listings?.length ? {
        lat: listings[0].latitude,
        lng: listings[0].longitude,
      } : { lat: 0, lng: 0 };
    
      const memoizedMarkers = useMemo(() => (
        listings?.map((listing) => (
          <Marker
            icon={`data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAAD8GO2jAAAAC0lEQVR42mP8/wcAAwAB/2WCRF4AAAAASUVORK5CYII=`}
            key={listing?._id}
            position={{ lat: listing.latitude, lng: listing.longitude }}
            label={{
              text: `${listing?.price}`,
              color: `green`,
              fontSize: `20px`,
              className: "marker-label",
            }}
            onClick={() => setSelected(listing)}
          />
        ))
      ), [listings]);
    
     
  return (
    isLoaded ? (
      <GoogleMap
      mapContainerStyle={containerStyle}
      zoom={18}
      center={center}
    >
      {memoizedMarkers}
      {/* {listings?.map((listing) => (
        <Marker
        icon={`data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAAD8GO2jAAAAC0lEQVR42mP8/wcAAwAB/2WCRF4AAAAASUVORK5CYII=`}
          key={listing?._id}
          position={{ lat: listing.latitude, lng: listing.longitude }}
          // icon={createCustomMarkerIcon(listing.price)}
          label={{
            text: `${listing?.price}`,
            color: `green`,
            fontSize:`20px`,
            className: "marker-label",
          }}

          onClick={() => setSelected(listing)}
          color="green"
        />
      ))} */}

      {selected && (
        <InfoWindow
  
          position={{ lat: selected.latitude, lng: selected.longitude }}
          onCloseClick={() => setSelected(null)}
        >
          <ListingCard {...selected} operation={false}/>
        </InfoWindow>
      )}
    </GoogleMap>
    ) : <DLoader/>
  )
}

export default ExploreMap






// useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch('/zone_a.xlsx');
  //       const arrayBuffer = await response.arrayBuffer();
  //       const workbook = XLSX.read(arrayBuffer, { type: 'array' });
  //       const sheetName = workbook.SheetNames[0];
  //       const sheet = workbook.Sheets[sheetName];
  //       const data = XLSX.utils.sheet_to_json(sheet);
  //       const coords = data.map(row => ({
  //         lat: parseFloat(row.Latitude),
  //         lng: parseFloat(row.Longitude)
  //       }));
  //       setZone(coords);
  //     } catch (error) {
  //       throw error;
  //     }
  //   };

  //   fetchData();
  // }, []);


 