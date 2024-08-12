import * as XLSX from 'xlsx'

import React, { useEffect, useState,useCallback, useMemo} from 'react'
import { GoogleMap, Marker, InfoWindow, MarkerClusterer} from '@react-google-maps/api';
import './ExploreMap.css'

import DLoader from '../loaderDashboard/dLoader';
import { useGoogleMaps } from '../../context/GoogleMapContext';


const TestMap = () => {
    const [selected, setSelected] = useState(null);
    const [listings, setListings]=useState([]);
    const {isLoaded}=useGoogleMaps();
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch('/zone_a.xlsx');
            const arrayBuffer = await response.arrayBuffer();
            const workbook = XLSX.read(arrayBuffer, { type: 'array' });
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            const data = XLSX.utils.sheet_to_json(sheet);
            const coords = data.map(row => ({
              houseNo: parseFloat(row.House_no),  
              lat: parseFloat(row.Latitude),
              lng: parseFloat(row.Longitude)
            }));
            console.log(coords);
            setListings(coords);
          } catch (error) {
            throw error;
          }
        };
    
        fetchData();
      }, []);


  
   
    const containerStyle = {
        width: '90%',
        height: '90%'
      };
      
      const center = useMemo(() => ({
        lat: 27.676207,
        lng: 85.351571,
    }), []);
      const handleMarkerClick = useCallback((listing) => {
        console.log("markerClicked!");
        setSelected(listing);
    }, []);
    const clusterOptions = {
      imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m', // Default image path
      gridSize: 30, // Smaller grid size for clustering closer markers
      // maxZoom: 15, // Maximum zoom level where clustering is applied
      // styles: clusterStyles 
  };
      const markers = useMemo(() => listings.map((listing) => (
        <Marker
            key={`${listing.lat}-${listing.lng}`}
            position={{ lat: listing.lat, lng: listing.lng }}
            label={{ text: `${listing.houseNo}`, color: '#fff', fontSize: '16px', className: 'marker-label' }}
            onClick={() => handleMarkerClick(listing)}
        />
    )), [listings,handleMarkerClick]);
    
     
  return (
    isLoaded ? (
      <GoogleMap
      mapContainerStyle={containerStyle}
      zoom={15}
      center={center}
      mapId="c37be0b290da9fa9"
    >
             { <MarkerClusterer options={clusterOptions}>
                    {(clusterer) => markers.map(marker => React.cloneElement(marker, { clusterer }))}
                </MarkerClusterer>}

      {selected && (
        <InfoWindow
          position={{ lat: selected.lat, lng: selected.lng }}
          onCloseClick={() => setSelected(null)}
        >
          <h1>Pranked</h1>
        </InfoWindow>
      )}
    </GoogleMap>
    ) : <DLoader/>
  )
}

export default TestMap









 