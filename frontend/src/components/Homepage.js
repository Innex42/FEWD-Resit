import React from "react";
import { MapContainer, TileLayer, useMap } from 'react-leaflet'
import Map from "./LeafletMap";

const Homepage = () => {
    return(
        <>
            <div align="center">
                <h1>Homepage</h1>
            </div>
            <Map />
        </>
    );
};

export default Homepage;