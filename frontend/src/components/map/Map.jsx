import React, { useEffect, useState, lazy} from 'react'
import { Oval } from 'react-loader-spinner';
import { GoogleMap, Marker, Polygon, useJsApiLoader } from '@react-google-maps/api';
import * as XLSX from 'xlsx'

const Map = () => {
  const [zone, setZone]=useState([]);
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
          lat: parseFloat(row.Latitude),
          lng: parseFloat(row.Longitude)
        }));
        setZone(coords);
      } catch (error) {
        throw error;
      }
    };

    fetchData();
  }, []);


 
   
    const containerStyle = {
        width: '100vw',
        height: '100vh'
      };
      
      const center = {
        lat: 27.6742646,
        lng: 85.3422879

      };
      const anotherMarker = {
        lat: 27.71109,
        lng: 85.3245
      };
      const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyApJbrw1zZAbrJCz4Zrv4K_pZnjSpETvuA"
      })
     
  return (
    isLoaded ? (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={15}
        >
        </GoogleMap>
    ) : <h1><Oval visible={true} height="200" color="#000000" ariaLabel="oval-loading" /></h1>
  )
}

export default Map