import React, { useEffect, useState } from 'react'
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