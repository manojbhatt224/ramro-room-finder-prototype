import * as XLSX from "xlsx";
import React, {
  useEffect,
  useState,
  useCallback,
  useMemo,
  useRef,
} from "react";
import {
  GoogleMap,
  Marker,
  InfoWindow,
  MarkerClusterer,
} from "@react-google-maps/api";
import "./ExploreMap.css";

import DLoader from "../loaderDashboard/dLoader";
import { useGoogleMaps } from "../../context/GoogleMapContext";
import MapAddInfoWindow from "./addInfoWindow/MapAddInfoWindow";

const TestMap = ({onAddClick}) => {
  const [selected, setSelected] = useState(null);
  const [listings, setListings] = useState([]);
  const [zoneData, setZoneData] = useState([]);
  const { isLoaded } = useGoogleMaps();


  const mapRef = useRef(null);
  const loadZoneData = async () => {
    try {
      const response = await fetch("/zone_a.xlsx"); // Single file for all zones and sub-zones
      const arrayBuffer = await response.arrayBuffer();
      const workbook = XLSX.read(arrayBuffer, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const data = XLSX.utils.sheet_to_json(sheet);
      const coords = data.map((row) => ({
        houseNo: parseFloat(row.House_no),
        lat: parseFloat(row.Latitude),
        lng: parseFloat(row.Longitude),
        subZone: row.SubZone,
        fullAddress: row.FullAddressDetail
      }));
      setZoneData(coords); // Store all data in state
    } catch (error) {
      console.error(error);
    }
  };
  const appendListings = useCallback(() => {
    setListings(zoneData);
  }, [zoneData]);
  useEffect(() => {
    loadZoneData();
  }, []);
  useEffect(() => {
appendListings();
  }, [appendListings]);





  const containerStyle = {
    width: "100%",
    height: "100%",
  };

  const center = useMemo(
    () => ({
      lat: 27.677017,
      lng: 85.352148,
    }),
    []
  );

  const handleMarkerClick = useCallback((listing) => {
    setSelected(listing);
  }, []);

  const clusterOptions = {
    imagePath:
      "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m",
    gridSize: 30,
  };

  const markers = useMemo(
    () =>
      listings.map((listing) => (
        <Marker
        icon={`data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAAD8GO2jAAAAC0lEQVR42mP8/wcAAwAB/2WCRF4AAAAASUVORK5CYII=`}
          key={`${listing.lat}-${listing.lng}`}
          position={{ lat: listing.lat, lng: listing.lng }}
          label={{
            text: `${listing.houseNo}`,
            color: `green`,
            fontSize:`20px`,
            className: "marker-label",
          }}
          onClick={() => handleMarkerClick(listing)}
        />
      )),
    [listings, handleMarkerClick]
  );

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      zoom={15}
      center={center}
      onLoad={(map) => (mapRef.current = map)} // Save the map instance to mapRef
    >
      <MarkerClusterer options={clusterOptions}>
        {(clusterer) =>
          markers.map((marker) => React.cloneElement(marker, { clusterer }))
        }
      </MarkerClusterer>

      {selected && (
        <InfoWindow
          position={{ lat: selected.lat, lng: selected.lng }}
          onCloseClick={() => setSelected(null)}
        >
          <div>
            <MapAddInfoWindow location={selected} onAddClick={onAddClick}/>     
                 </div>
        </InfoWindow>
      )}
    </GoogleMap>
  ) : (
    <DLoader />
  );
};

export default TestMap;
