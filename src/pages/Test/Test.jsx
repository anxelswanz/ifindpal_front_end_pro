import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import GoogleMapReact from 'google-map-react'
export default function SimpleMenu() {

    const coordinates = { lat: 0, lng: 0 };

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
            alert('123', latitude, longitude)
            console.log(latitude, longitude);
        }, error => {
            alert(error);
        })
    }, [])
    return (
        <div >
            
        </div>
    );
}
