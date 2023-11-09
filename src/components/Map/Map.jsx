import React, { useEffect, useState } from 'react'
import GoogleMapReact from 'google-map-react'
import { Switch, Typography } from '@material-ui/core';
import { mapStyles } from './mapStyles';
import { getUsersByCity } from '../../api/Api';
import axios from 'axios';
import { setMeOnMap } from '../../api/Api';
import { Navigate, useNavigate } from 'react-router-dom';
import { ifMeOnTheMap } from '../../api/Api';
import MapLoading from '../../assets/img/maploading.gif'
export default function Map() {
    const [coordinates, setCoordinates] = useState({ lat: 51.50722, lng: 0.12750 });
    const [user, setUser] = useState();
    const [userList, setUserList] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    /**
     * show me on map
     */
    const [show, setShow] = useState(false);

    const handleChange = async () => {
        setIsLoading(true);
        const userJson = localStorage.getItem("user");
        const obj = JSON.parse(userJson);
        const user = obj.user;
        if (show == true) {
            let map = {};
            map.userId = user.userId
            map.avatar = user.avatar
            map.lat = coordinates.lat
            map.lng = coordinates.lng
            map.currentCity = user.currentCity
            map.ifShow = false
            const res = await axios.post(setMeOnMap, map)
        } else {
            let map = {};
            map.userId = user.userId
            map.avatar = user.avatar
            map.lat = coordinates.lat
            map.lng = coordinates.lng
            map.currentCity = user.currentCity
            map.ifShow = true
            const res = await axios.post(setMeOnMap, map)
        }
        setShow(!show);
        setTimeout(() => {
            setIsLoading(false);
        }, 1000)

    }

    /**
     * 获取用户的位置
     */
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
            setCoordinates({ lat: latitude, lng: longitude });
        }, error => {
            switch(error.code)
            {
            case error.PERMISSION_DENIED:
              alert("User denied the request for Geolocation.")
              break;
            case error.POSITION_UNAVAILABLE:
              alert("Location information is unavailable.")
              break;
            case error.TIMEOUT:
              alert("The request to get user location timed out.")
              break;
            case error.UNKNOWN_ERROR:
              alert("An unknown error occurred.")
              break;
            }
        })
        setTimeout(() => {
            setIsLoading(false);
        }, 1000)
    }, [show])

    /**
     * 获取当前城市的map信息
     */
    useEffect(() => {
        const userJson = localStorage.getItem("user");
        const obj = JSON.parse(userJson);
        const user = obj.user;
        if (user == undefined || user == null || user == '') {
            navigate('/login');
        }
        setUser(user);

        const asyncFunc = async () => {
            try {
                const res = await axios.get(`${getUsersByCity}?currentCity=${user.currentCity}`)
                setUserList(res.data.obj);
                /**
                 * 我是否在map上
                 */
                const data = await axios.get(`${ifMeOnTheMap}?userId=${user.userId}`);
                setShow(data.data.obj);
            } catch (e) {
                //navigate('/login');
                console.log(e);
            }
        }
        asyncFunc();

    }, [show, coordinates])

    useEffect(() => {

    }, [user])
    return (

        <div style={{
            width: '100%',
            height: '25rem',
        }}>

            <span style={{
                color: '#6B2ECB',
                fontWeight: 'bold',

            }}>
                Show me on map
            </span>

            <Switch
                checked={show}
                onChange={handleChange}
                name="checkedB"
                color="secondary"
            />
            {
                user ? <span style={{
                    color: '#6B2ECB',
                    fontWeight: 'bold',
                    marginLeft: '7rem'
                }}>
                    {user.currentCity} 
                </span> : ''
            }
            {
                isLoading ? <img style={{
                    position: 'absolute',
                    top: '16rem',
                    width: '15rem',
                    height: '15rem',
                    right: '25rem'
                }} src={MapLoading} /> : <GoogleMapReact
                    bootstrapURLKeys={{ key: 'AIzaSyAv4fWyvh0FAe0RX-3QCwoamX6NTPAAOh8' }}
                    defaultCenter={coordinates}
                    center={coordinates}
                    defaultZoom={15}
                    onChange={(e) => {
                    }}
                    onChildClick={(child) => { }}
                    options={{ disableDefaultUI: true, zoomControl: true, styles: mapStyles }}
                >

                    {
                        userList?.map((u) => {
                            return <div
                                lat={u.lat}
                                lng={u.lng}
                            >
                                <img
                                    style={{
                                        width: '4rem',
                                        height: '4rem'
                                    }}
                                    src={u.avatar} />
                            </div>

                        })
                    }

                </GoogleMapReact >
            }


        </div >
    )
}
