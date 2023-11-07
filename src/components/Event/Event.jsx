import React, { useState, useEffect } from 'react'
import styles from './event.module.css'
import Search from 'antd/es/input/Search'
import { TextField, Chip, Box, Button, Dialog, DialogActions, DialogContentText, DialogContent, DialogTitle } from '@material-ui/core'
import { makeStyles } from '@material-ui/core'
import BoyDemo from '../../assets/demo/BoyDemo.png'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import DisplayPic from '../DisplayPic/DisplayPic'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../assets/css/iconfont.css'
import { getMyEvent } from '../../api/Api'

const useStyles = makeStyles({
    newssearch: {
        width: '90% !important',
        height: '4rem',
        marginLeft: '5%'
    },
    tags: {
        backgroundColor: 'white',
        color: 'black',
        marginRight: '1.2rem',
        cursor: 'pointer',
    },
    selected: {
        background: '#8A59D6',
        marginRight: '1.2rem',
        cursor: 'pointer',
        color: 'white',
    },
    requestbtn: {
        color: '#6B2ECB',
        borderRadius: '10px',
        marginRight: '0.5rem'
    }
})

export default function News() {

    const classes = useStyles();
    const navigate = useNavigate();
    const [user, setUser] = useState();
    const [token, setToken] = useState('');
    const [post, setPost] = useState([]);
    const [themeId, setThemeId] = useState();
    const [tags, setTags] = useState([]);
    const [active, setActive] = useState();
    const [tagId, setTagId] = useState();
    const [currentCity, setCurrentCity] = useState();

    const toastOptions = {
        position: "bottom-right",
        autoClose: 9000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
    };

    /**
   * useEffect 获取Events内容
   */
    useEffect(async () => {
        const userJson = localStorage.getItem('user');
        const obj = JSON.parse(userJson);
        setToken(obj.token);
        setUser(obj.user);
        const currentCity = obj.user.currentCity;
        setCurrentCity(currentCity);
        if (obj.user == undefined) {
            navigate('/login');
        }


    }, [])

    useEffect(() => {
        const asyncFunc = async () => {
            try {
                console.log('user', user);
                const data = await axios.get(`${getMyEvent}?userId=${user.userId}`);
                const allPosts = data.data.obj;
                setPost(allPosts)
            } catch (e) {
                console.log(e);
            }
        }
        asyncFunc();
    }, [user])

    /**
     * 刷新
     */
    function reload() {
        window.location.reload();
    }


    /**
     * borderControl 如果过期就为red 没过期为green
     */
    const [control, setControl] = useState(false);
    function compareTime(date) {
        const nowDate = getCurrentDate();
        console.log(nowDate);
        var d1 = new Date(date);
        var d2 = new Date(nowDate);
        if (d1 > d2) {
            return 0;
        } else {
            return 1;
        }
    }

    function getCurrentDate() {
        var char = '-';
        var d = new Date();
        var year = d.getFullYear();
        var month = d.getMonth() + 1;
        var day = d.getDate();
        return year + char + month + char + day;
    }
    /**
     * 遍历内容
     */
    const elements = post?.map((p, index) => {
        const dateTime = p.eventDate;
        const firstED = dateTime.slice(0, 10);
        const lastED = dateTime.slice(12, 16);
        const postId = p.postId;
        const postUserId = p.postUserId;
        const createTime = p.createTime;
        const postUserAvatar = p.postUserAvatar;
        const postNickName = p.postNickName;
        const firstD = createTime.slice(0, 10);
        const lastD = createTime.slice(12, 16);
        const nowDate = getCurrentDate();
        var ifPast = compareTime(firstED);
        return <div className={styles.newsbox} style={{
            border: ifPast === 1 ? '2px solid red' : '2px solid green',
        }}>
            <Box sx={{
                display: 'grid',
                color: 'black',
                fontSize: '14px'
            }}>
                <Box sx={{
                    display: 'flex',
                    alignContent: 'center',
                    position: 'relative'
                }}>
                    <div className={styles.avatar} >
                        <img style={{
                            width: '100%',
                            height: '100%'
                        }} src={p.postUserAvatar} />
                    </div>
                    <div className={styles.name}>{p.postNickName}</div>
                    <div className={styles.time}>{firstD}</div>
                    <div className={styles.minute}>{lastD}</div>
                </Box>
                <Box sx={{
                    display: 'grid',
                    gap: '0.3rem'
                }}>
                    <div>
                        <span style={{
                            color: '#633194'
                        }}>Event: </span> {p.eventName}

                    </div>
                    <div>
                        <span style={{
                            color: '#633194'
                        }}>Time: </span> {firstED} {lastED}
                    </div>
                    <div>
                        <span style={{
                            color: '#633194'
                        }}>Comment: </span>{p.description}
                    </div>
                </Box>
            </Box>
        </div>
    })



    return (

        <div className={styles.container}>
            <div className={styles.title}>
                <h2>My Event</h2>
                <span style={{ fontWeight: 'bold', marginLeft: '1rem', color: 'green' }}>Green: Coming</span>
                <span style={{ fontWeight: 'bold', marginLeft: '1rem', color: 'red' }}>Red: Ended</span>
            </div>
            <div className={styles.newscontainer}>
                {elements}
            </div>
            <ToastContainer />
        </div>

    )
}
