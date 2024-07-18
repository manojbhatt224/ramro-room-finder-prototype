import React, { useEffect, useState } from 'react'
import { GoogleMap, Marker, Polygon, useJsApiLoader } from '@react-google-maps/api';
import * as XLSX from 'xlsx'

const Map = () => {
  const [zone, setZone]=useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/zone_a.xlsx'); // Path relative to public folder
        const arrayBuffer = await response.arrayBuffer();
        const workbook = XLSX.read(arrayBuffer, { type: 'array' });

        // Convert the first sheet (assuming there's only one sheet) to JSON
        const sheetName = workbook.SheetNames[0]; // Assuming data is in the first sheet
        const sheet = workbook.Sheets[sheetName];
        const data = XLSX.utils.sheet_to_json(sheet);

        // Set the Excel data in state
        // console.log(data);
        const coords = data.map(row => ({
          lat: parseFloat(row.Latitude),
          lng: parseFloat(row.Longitude)
        }));
        console.log(coords);
        console.log("First coordinate", coords[0].lat, coords[0].lng)
        setZone(coords);
      } catch (error) {
        console.error('Error fetching or parsing file:', error);
      }
    };

    fetchData();
  }, []);


 
   
    const containerStyle = {
        width: '800px',
        height: '800px'
      };
      
      const center = {
        lat: 27.676059,
        lng: 85.351487

      };
      const anotherMarker = {
        lat: 27.71109,
        lng: 85.3245
      };
      const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyC_siAOGtkjHJ4i_1SzyjaSV8VC83vfYAw"
      })
     
  return (
    isLoaded ? (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={30}
        >
     {zone.length > 0 && (
        <Polygon
          path={zone}
          options={{
            fillColor: '#FF0000',
            fillOpacity: 0.4,
            strokeColor: '#FF0000',
            strokeOpacity: 1,
            strokeWeight: 2
          }}
        />
      )}
        </GoogleMap>
    ) : <></>
  )
}

export default Map