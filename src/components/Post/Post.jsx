import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { test } from '../../api/Api'
import styles from './post.module.css';
import Grid from '@material-ui/core/Grid';
import { Chip, TextField, makeStyles, Menu, MenuItem } from '@material-ui/core'
import { getTagsByTheme } from '../../api/Api';
import '../../assets/css/iconfont.css'
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import { Button } from 'antd';
import { createPost } from '../../api/Api';
import { useNavigate } from 'react-router-dom';
const useStyles = makeStyles({
    col: {
        display: 'flex !important',
        alignItems: 'center !important',
        marginBottom: '1rem',
        verticalAlign: 'center',
        lineHeight: '100%',
        height: '2.5rem',
        fontSize: '12px',
        color: 'black'
    },
    chip: {
        marginLeft: '0.5rem',
        cursor: 'pointer',
    },
    selected: {
        background: '#8A59D6',
        marginLeft: '0.5rem',
        cursor: 'pointer',
        color: 'white'
    },
    submitBtn: {
        color: 'white',
        backgroundColor: '#8A59D6'
    }
})

export default function Post() {
    const classes = useStyles();
    const navigate = useNavigate();
    const [theme, setTheme] = useState();
    const [token, setToken] = useState('');
    const [user, setUser] = useState();
    /**
     * event name 
     */
    const [eventName, setEventName] = useState();

    /**
     * data获取到tags
     */
    const [tags, setTags] = useState([]);
    const [tagId, setTagId] = useState();
    /**
     * active:
     * -> for chip 选择tag
     */
    const [active, setActive] = useState();
    //const theme = localStorage.getItem('theme');
    const themeId = localStorage.getItem('themeId');
    /**
     * useEffect1 localStorage获取themeId进行转换str并展示
     */


    // date picker
    const [selectedDate, setSelectedDate] = useState();
    const [expireDate, setExpireDate] = useState();
    /**
     * location
     */
    const [location, setLocation] = useState();
    /**
     * postcode 
     */
    const [postcode, setPostcode] = useState();
    /**
     * description
     */

    const [description, setDescription] = useState();

    useEffect(() => {
        /**
         * 转换
         */
        if (themeId == 1) {
            setTheme('Art & Music')
        } else if (themeId == 2) {
            setTheme("Sports")
        } else if (themeId == 3) {
            setTheme("Gaming")
        } else if (themeId == 4) {
            setTheme("Event")
        }
    }, [])

    /**
     * useEffect2: 获取用户
     */
    useEffect(() => {
        const userJson = localStorage.getItem('user');
        const obj = JSON.parse(userJson);
        const tokenStr = obj.token;
        setToken(tokenStr);
        setUser(obj.user);
    }, [])


    /**
     * useEffect3: 获取tag请求
     */
    useEffect(() => {
        const asynFunc = async () => {
            try {
                axios.interceptors.request.use(config => {
                    config.headers = {
                        authorization: token,
                        ...config.headers
                    }
                    return config;
                }
                )
                const data = await axios.get(`${getTagsByTheme}?themeId=${themeId}`, {
                    headers: {
                        authorization: token
                    }
                });
                const tagsArr = data.data.obj;
                setTags(tagsArr);
                setTags(tagsArr.slice())
            } catch (e) {

            }
        }
        asynFunc();
    }, [token])


    /**
     * handleClick: 点击出现menu
     */
    const [contact, setContact] = useState();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [text, setText] = useState('Please select your contact way');
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (str) => {
        console.log();
        if (typeof str == 'string') {
            setText(str);
        }

        setAnchorEl(null);
    };

    /**
     * handleSubmit: 提交表单
     */

    const toastOptions = {
        position: "bottom-right",
        autoClose: 9000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
    };

    const handlSubmit = async () => {
        console.log(eventName == '' || eventName == null ||
            tagId === '' || tagId === null ||
            selectedDate === undefined || selectedDate === '' ||
            expireDate === undefined || expireDate === '' ||
            description === '' || description === null
        );
        /**
         * 获取userid / nickname / currentcity
         */
        const userId = user.userId;
        const nickName = user.nickName;
        const currentCity = user.currentCity;
        const postUserAvatar = user.avatar;
        /**
         * 校验
         */
        if (eventName == '' || eventName == null ||
            tagId === '' || tagId === null || tagId == undefined ||
            selectedDate === undefined || selectedDate === '' ||
            expireDate === undefined || expireDate === '' ||
            description === '' || description === null ||
            text === '' || text === null ||
            contact === '' || contact === null ||
            location == '' || location == null ||
            postcode == '' || postcode == null) {
            toast.error('Please fill all the blanks', toastOptions);
            return;
        }

        /**
         * 校验日期
         */
        let nowDate = getNowDate();
        let a = selectedDate.slice(0, 10);
        let dif1 = compareDate(nowDate, a);
        if (dif1 === 1) {
            toast.error('The event date must be after today', toastOptions);
            return;
        }

        let dif2 = compareDate(nowDate, expireDate);
        if (dif2 === 1) {
            toast.error('The expire date must be after today', toastOptions);
            return;
        }


        /**
         * 发送请求
         */
        const res = await axios.post(createPost, {
            eventName,
            tagId,
            eventDate: selectedDate,
            expireDate,
            contactWay: text,
            contact,
            description,
            location,
            postcode,
            postUserId: userId,
            postNickName: nickName,
            currentCity,
            postUserAvatar,
        }, {
            headers: {
                authorization: token,
            }
        })

        if (res.data.code == 200) {
            navigate("/success?title=Post");
        } else {
            if (res.data.obj == "EXCEED3") {
                toast.error('Post failure : You have already submitted 3 posts today', toastOptions);
                return;
            }
        }

    }

    /**
     * 
     * @returns 获取当前日期
     */
    function getNowDate() {
        let date = new Date();
        console.log(date.getDay());
        var char = '-';
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        return year + char + month + char + day;
    }
    /**
     * 日期比较
     */
    function compareDate(date1, date2) {
        var d1 = new Date(date1);
        var d2 = new Date(date2);
        if (d1 > d2) {
            return 1;
        } else {
            return 0;
        }
    }

    /**
     * 遍历tags
     */
    const showTags = tags?.map((t, index) => {
        return <Chip
            onClick={() => { setActive(index); setTagId(t.tagId) }}
            className={index === active ? classes.selected : classes.chip}
            size='small' label={t.tagName}>
            {t.tagName}
        </Chip>
    })



    return (
        <>

            <Grid container>
                <Grid className={classes.col} item xs={12} >
                    <h2>Post an event for {theme} ( Only 3 Posts per Day)</h2>
                </Grid>
                <Grid className={classes.col} itme xs={12} >
                    &nbsp;
                    <TextField
                        onChange={(e) => { setEventName(e.target.value) }}
                        label='Event Name'
                        color='secondary'
                        size='small' />
                    &nbsp;&nbsp;
                    <TextField
                        size='small'
                        label='Location'
                        onChange={(e) => { setLocation(e.target.value) }}
                    />
                    &nbsp;&nbsp;
                    <TextField
                        label='Postcode'
                        size='small'
                        onChange={(e) => { setPostcode(e.target.value) }}
                    />
                </Grid>
                <Grid className={classes.col} itme xs={12} >
                    Select One Tag:&nbsp;
                    {
                        showTags
                    }
                </Grid>
                <Grid className={classes.col} item xs={12} >
                    Event Time: &nbsp; <TextField
                        id="date"
                        type="datetime-local"
                        defaultValue="2024-01-01"
                        onChange={(e) => { console.log(setSelectedDate(e.target.value)); }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    &nbsp;&nbsp;
                    Expire Date: <TextField
                        id="date"
                        type="date"
                        onChange={(e) => { console.log(setExpireDate(e.target.value)); }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />

                </Grid>
                <Grid className={classes.col} item xs={12} >
                    Description: &nbsp;
                    <textarea
                        onChange={(e) => { setDescription(e.target.value) }}
                        className={styles.textarea}></textarea>
                </Grid>
                <Grid className={classes.col} item xs={12} >
                    <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                        {text}
                    </Button>
                    <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={() => { handleClose("Phone") }}><span className='iconfont icon-phone'></span> &nbsp; Phone</MenuItem>
                        <MenuItem onClick={() => { handleClose("Email") }}><span className='iconfont icon-email-fill'></span>&nbsp;Email</MenuItem>
                        <MenuItem onClick={() => { handleClose("Instagram") }}><span className='iconfont icon-instagram '></span>&nbsp;Instagram</MenuItem>
                        <MenuItem onClick={() => { handleClose("Facebook") }}><span className='iconfont icon-facebook '></span>&nbsp;Facebook</MenuItem>
                    </Menu>
                    &nbsp;&nbsp;&nbsp;
                    <TextField label='Your contact' color='secondary' onChange={(e) => { setContact(e.target.value) }} size='small' />
                </Grid>
                <Grid className={classes.col} item xs={12} >
                    <Button
                        onClick={handlSubmit}
                        variant='contained' className={classes.submitBtn} >Submit</Button>
                </Grid>
            </Grid >
            <ToastContainer />
        </>
    )
}
