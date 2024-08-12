import * as XLSX from 'xlsx';
import React, { useEffect, useState, useCallback, useMemo, useRef } from 'react';
import { GoogleMap, Marker, InfoWindow, MarkerClusterer } from '@react-google-maps/api';
import './ExploreMap.css';

import DLoader from '../loaderDashboard/dLoader';
import { useGoogleMaps } from '../../context/GoogleMapContext';

const TestMap = () => {
    const [selected, setSelected] = useState(null);
    const [listings, setListings] = useState([]);
    const [zoneData, setZoneData] = useState([]);
    const { isLoaded } = useGoogleMaps();
    const [currentSubZone, setCurrentSubZone] = useState(null);

    const mapRef = useRef(null); // Define the mapRef

    // Load data from the XLSX file
    const loadZoneData = async () => {
        try {
            const response = await fetch('/zone_a.xlsx'); // Single file for all zones and sub-zones
            const arrayBuffer = await response.arrayBuffer();
            const workbook = XLSX.read(arrayBuffer, { type: 'array' });
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            const data = XLSX.utils.sheet_to_json(sheet);
            const coords = data.map(row => ({
                houseNo: parseFloat(row.House_no),
                lat: parseFloat(row.Latitude),
                lng: parseFloat(row.Longitude),
                subZone: row.SubZone
            }));
            setZoneData(coords); // Store all data in state
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        loadZoneData(); // Load the data once on component mount
    }, []);

    // Filter data based on the current sub-zone
    const filterListings = useCallback(() => {
        if (currentSubZone && zoneData.length > 0) {
            const filteredListings = zoneData.filter(listing =>
                listing.subZone === currentSubZone
            );
            setListings(filteredListings);
        }
    }, [currentSubZone, zoneData]);

    // Call filterListings when sub-zone changes
    useEffect(() => {
        filterListings();
    }, [currentSubZone, filterListings]);

    // This function updates markers as user moves or zooms
    const handleBoundsChanged = useCallback(() => {
        if (mapRef.current) {
            // Get the current center and bounds of the map
            const mapCenter = mapRef.current.getCenter();
            const mapBounds = mapRef.current.getBounds();

            // Determine the current sub-zone based on the bounds
            const subZone = determineSubZone(mapBounds); // Implement logic to determine sub-zone

            // Update the current sub-zone state
            if (subZone !== currentSubZone) {
                setCurrentSubZone(subZone);
            }
        }
    }, [currentSubZone]);

    // Example function to determine the sub-zone based on map bounds
    const determineSubZone = (bounds) => {
        const { east, north, west, south } = bounds.toJSON(); // Convert bounds to JSON format

        // Define sub-zones with their boundaries (example)
        const subZones = [
            { name: 'Aa', latBounds: [27.675557, 27.711407], lngBounds: [85.351053, 85.369611] },
            { name: 'Ab', latBounds: [27.6, 27.7], lngBounds: [85.35, 85.4] },
            // Add more sub-zones as needed
        ];

        // Find the sub-zone that intersects with the bounds
        const subZone = subZones.find(sz =>
            north >= sz.latBounds[0] && south <= sz.latBounds[1] &&
            east >= sz.lngBounds[0] && west <= sz.lngBounds[1]
        );

        return subZone ? subZone.name : null;
    };

    const containerStyle = {
        width: '90%',
        height: '90%'
    };

    const center = useMemo(() => ({
        lat: 27.677017,
        lng: 85.352148,
    }), []);

    const handleMarkerClick = useCallback((listing) => {
        setSelected(listing);
    }, []);

    const clusterOptions = {
        imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m',
        gridSize: 30,
    };

    const markers = useMemo(() => listings.map((listing) => (
        <Marker
            key={`${listing.lat}-${listing.lng}`}
            position={{ lat: listing.lat, lng: listing.lng }}
            label={{ text: `${listing.houseNo}`, color: '#fff', fontSize: '16px', className: 'marker-label' }}
            onClick={() => handleMarkerClick(listing)}
        />
    )), [listings, handleMarkerClick]);

    return (
        isLoaded ? (
            <GoogleMap
                mapContainerStyle={containerStyle}
                zoom={15}
                center={center}
                onBoundsChanged={handleBoundsChanged}
                mapId="c37be0b290da9fa9"
                onLoad={map => mapRef.current = map} // Save the map instance to mapRef
            >
                <MarkerClusterer options={clusterOptions}>
                    {(clusterer) => markers.map(marker => React.cloneElement(marker, { clusterer }))}
                </MarkerClusterer>

                {selected && (
                    <InfoWindow
                        position={{ lat: selected.lat, lng: selected.lng }}
                        onCloseClick={() => setSelected(null)}
                    >
                        <div>
                            <h2>House No: {selected.houseNo}</h2>
                            <p>Sub-Zone: {selected.subZone}</p>
                        </div>
                    </InfoWindow>
                )}
            </GoogleMap>
        ) : <DLoader />
    );
}

export default TestMap;
