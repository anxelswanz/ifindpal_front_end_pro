import React, { useEffect, useState } from 'react'
import Header from '../../components/Header/Header'
import styles from './home.module.css'
import FaceIcon from '@material-ui/icons/Face';
import AddIcon from '@material-ui/icons/Add';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core'
import { Link, NavLink, Route, Routes, Outlet, useNavigate } from 'react-router-dom';
import News from '../../components/News/News';
import Post from '../../components/Post/Post';
import { useSearchParams } from 'react-router-dom';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import AnnouncementIcon from '@material-ui/icons/Announcement';
import ExploreIcon from '@material-ui/icons/Explore';
import DisplayPic from '../../components/DisplayPic/DisplayPic';
const useStyles = makeStyles({
    button: {
        width: '90%',
        height: '4rem',
        color: 'white',
        backgroundColor: '#8A59D6',
        borderRadius: '5px',
        '&:hover': {
            backgroundColor: '#6B2ECB',
            boxShadow: 'none',
        }
    },
    icon: {
        verticalAlign: 'baseline',
        position: 'absolute',
        left: '2.4rem',
        top: '1.2rem'
    },
})

export default function Home() {
    const classes = useStyles();
    const navigate = useNavigate();
    /**
     * search:
     * 1. get the theme from select page
     */
    const [search, setsearch] = useSearchParams()
    const [theme, setTheme] = useState();
    const [token, setToken] = useState();
    const [user, setUser] = useState();



    useEffect(() => {
        /**
       * 1. 验证用户是否登录，如果没登陆那么就返回登录界面
       */
        const userJson = localStorage.getItem('user');
        const obj = JSON.parse(userJson);
        if (obj == null || obj == null) {
            alert('please login first')
            navigate('/login');
            return;
        }
        const userObj = obj.user;
        const tokenStr = obj.token;

        /**
         * 3.获取 theme 如果theme为空那么返回theme select
         */
        const getTheme = search.get('theme');
        console.log(getTheme);
        if (getTheme == null) {
            navigate('/select');
        }
        setTheme(getTheme);
        setToken(tokenStr);
        setUser(userObj);
    }, [])

    /**
      * 验证用户账号是否被激活
      */
    useEffect(() => {
        const userJson = localStorage.getItem('user');
        const obj = JSON.parse(userJson);
        const ifUserActivated = obj.user;
        if (ifUserActivated.ifActivate == 0) {
            navigate("/beforeSignIn");
        }
    }, [])

    return (
        <>
            <Header />
            <div className={styles.container}>
                {/* left console */}
                <div className={styles.consolebox}>
                    <div className={styles.console}>
                        <h2>{theme}</h2>
                        <div className={styles.consoleinput}>
                            <div>
                                <NavLink to='/home/news' className={styles.navlink}>
                                    <Button variant='contained' className={classes.button}>
                                        <AnnouncementIcon className={classes.icon} />
                                        News
                                    </Button>
                                </NavLink>
                            </div>
                            <div>
                                <NavLink to='/home/displaypic' className={styles.navlink}>
                                    <Button variant='contained' className={classes.button}>
                                        <ExploreIcon className={classes.icon} />
                                        Recommended
                                    </Button>
                                </NavLink>
                            </div>
                            <div>
                                <NavLink to='/home/myevent' className={styles.navlink}>
                                    <Button variant='contained' className={classes.button}>
                                        <EventAvailableIcon className={classes.icon} />
                                        My Event
                                    </Button>
                                </NavLink>
                            </div>
                            <div>
                                <NavLink to='/myPal' className={styles.navlink}>
                                    <Button variant='contained' className={classes.button}>
                                        <InsertEmoticonIcon className={classes.icon} />
                                        My Pal
                                    </Button>
                                </NavLink>
                            </div>
                            <div>
                                <NavLink to='/home/map' className={styles.navlink}>
                                    <Button variant='contained' className={classes.button}>
                                        <ExploreIcon className={classes.icon} />
                                        Map
                                    </Button>
                                </NavLink>
                            </div>

                        </div>
                    </div>
                </div>
                {/* right content */}
                <div className={styles.content}>
                    <Outlet />
                </div>
            </div>
        </>

    )
}
