import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import GoogleMapReact from 'google-map-react'
export default function SimpleMenu() {

    const coordinates = { lat: 0, lng: 0 };
    return (
        <div style={{
            width: '100%',
            height: '40rem',
            border: '1px solid white',
        }}>
            123
            <GoogleMapReact
                bootstrapURLKeys={{ key: 'AIzaSyCsNVqfB4cruxYtZoznlybGW9SXAQUS-M0' }}
                defaultCenter={coordinates}
                center={coordinates}
                defaultZoom={14}
                onChange={(e) => {
                }}
                onChildClick={(child) => { }}
                options={''}
            >

            </GoogleMapReact>
        </div>
    );
}
