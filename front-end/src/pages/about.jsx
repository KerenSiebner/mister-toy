import React, { useState } from "react";
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div style={{fontSize:"3em"}}>{text}</div>;


const data = [
    {
        "id": 1,
        "name": "Chicago, Illinois",
        "lat": 41.881832,
        "lng": -87.623177
    },
    {
        "id": 2,
        "name": "Denver, Colorado",
        "lat": 39.739235,
        "lng": -104.99025
    },
    {
        "id": 3,
        "name": "Los Angeles, California",
        "lat": 34.052235,
        "lng": -118.243683
    }
];

export function About() {
    const coordinates = { lat: 32.2, lng: 34.9 }
    const zoom = 11

    const handleClick = ({ lat, lng }) => {
        // setCoordinates({ lat, lng })
    }

    return <div>
        <h1 style={{ textAlign: 'center', margin: '40px' }}>Shop branches</h1>
        <div style={{ height: '70vh', width: '90%', margin: 'auto' }}>
            <GoogleMapReact
                onClick={handleClick}
                bootstrapURLKeys={{ key: "AIzaSyA5YAKbctMWmj2etXv-KY7MSXDMGaWr0qs" }}
                defaultCenter={coordinates}
                center={coordinates}
                defaultZoom={zoom}
            >
                <AnyReactComponent
                    lat={coordinates.lat}
                    lng={coordinates.lng}
                    {...coordinates}
                    text="📍"
                />
            </GoogleMapReact>
        </div>
    </div>
}