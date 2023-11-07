import React, { useState, useEffect } from 'react'
import styles from './news.module.css'
import Search from 'antd/es/input/Search'
import { TextField, Chip, Box, Button, Dialog, DialogActions, DialogContentText, DialogContent, DialogTitle } from '@material-ui/core'
import { makeStyles } from '@material-ui/core'
import BoyDemo from '../../assets/demo/BoyDemo.png'
import axios from 'axios'
import { getAllPost } from '../../api/Api'
import { useNavigate } from 'react-router-dom'
import { getTagsByTheme } from '../../api/Api'
import { geContentsByTagId } from '../../api/Api'
import { fuzzyQueryPost } from '../../api/Api'
import { createMessage } from '../../api/Api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../assets/css/iconfont.css'
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


    /**
     * useEffect 获取tags
     */
    useEffect(() => {
        const themeId = localStorage.getItem('themeId');
        if (themeId == '' || themeId == undefined) {
            navigate('/select');
        }
        setThemeId(themeId);

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
 * useEffect 获取Events内容
 */
    useEffect(async () => {
        const themeId = localStorage.getItem('themeId');
        const userJson = localStorage.getItem('user');
        const obj = JSON.parse(userJson);
        setToken(obj.token);
        setUser(obj.user);
        const currentCity = obj.user.currentCity;
        setCurrentCity(currentCity);
        if (obj.user == undefined) {
            navigate('/login');
        }

        try {
            const data = await axios.get(`${getAllPost}?currentCity=${currentCity}&themeId=${themeId}`);
            const allPosts = data.data.obj;
            setPost(allPosts)
        } catch (e) {
            console.log('request bad');
        }
    }, [themeId])

    /**
     * 刷新
     */
    function reload() {
        window.location.reload();
    }

    /**
 * 发送request
 */
    const toastOptions = {
        position: "bottom-right",
        autoClose: 9000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
    };
    const [message, setMessage] = useState({});
    const [senderInfo, setSenderInfo] = useState();
    const [senderContact, setSenderContact] = useState();
    const [postUserId, setPostUserId] = useState('');
    const [postId, setPostId] = useState('');
    const [postUserAvatar, setPostUserAvatar] = useState('');
    const [postNickName, setPostNickName] = useState('');
    async function createMes() {
        message.postId = postId;
        message.receiver = postUserId;
        message.senderInfo = senderInfo;
        message.senderContact = senderContact;
        message.sender = user.userId;
        message.senderAvatar = postUserAvatar;
        message.senderName = postNickName;
        /**
         * 校验: 不能自己给自己发送
         */
        if (message.receiver == message.sender) {
            return 0;
        }
        /**
         * 发送请求
         */
        const data = await axios.post(createMessage, message);
        return data.data;
    }
    /**
    * request 弹出窗
    */
    const [open, setOpen] = React.useState(false);
    const [contactInfo, setContactInfo] = useState();
    const handleClickOpen = (postId, postUserId) => {
        setPostUserAvatar(user.avatar);
        setPostNickName(user.nickName);
        setOpen(true);
        setPostId(postId);
        setPostUserId(postUserId);
    };

    const handleClose = async () => {
        if (postId != '' || postUserId != '') {
            const data = await createMes();
            /**
            * 校验: 不能自己给自己发送
             */
            if (data == 0) {
                toast.error('You cannot send request to yourself', toastOptions);
                setOpen(false);
                return;
            }
            /**
             * 不能重复发送
             */
            if (data.obj == "MESSAGENOTALLOWED") {
                toast.error('You have already sent one request', toastOptions);
                setOpen(false);
                return;
            }
            if (data.code == 200) {
                navigate('/success?title=Requested')
            }
        }
        setOpen(false);
    };


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
        return <div className={styles.newsbox}>
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
                    <div>
                        <Button onClick={() => { handleClickOpen(postId, postUserId); }} variant='contained' className={classes.requestbtn} size='small'>Send Request</Button>
                        <Dialog
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="form-dialog-title">
                            <DialogTitle id="form-dialog-title">Send A Request</DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                    To send a request, please leave a message.
                                </DialogContentText>
                                <TextField
                                    onChange={(e) => { setSenderInfo(e.target.value) }}
                                    autoFocus
                                    margin="dense"
                                    id="name"
                                    fullWidth
                                />
                                <DialogContentText>
                                    If you wish they can contact you, please enter your contact information. (Optional)
                                </DialogContentText>
                                <TextField
                                    onChange={(e) => { setSenderContact(e.target.value) }}
                                    autoFocus
                                    margin="dense"
                                    id="name"
                                    fullWidth
                                />
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={() => { handleClose(); }} color="secondary">
                                    Cancel
                                </Button>
                                <Button onClick={() => { handleClose() }} color="secondary">
                                    Send
                                </Button>
                            </DialogActions>
                        </Dialog>
                        {/* <span>Now 12 people have already interested</span> */}
                    </div>
                </Box>
            </Box>
        </div>
    })

    /**
     * 遍历tags
     */
    const showTags = tags?.map((t, index) => {
        return <Chip

            onClick={() => { setActive(index); setTagId(t.tagId) }}
            className={index === active ? classes.selected : classes.tags}
            size='small' label={t.tagName}>
            {t.tagName}
        </Chip>
    })

    /**
     * 点击tag 调接口 返回数据装入post state
     */
    useEffect(() => {
        const asyncFunc = async () => {
            const res = await axios.get(`${geContentsByTagId}?tagId=${tagId}&currentCity=${currentCity}`, {
                headers: {
                    authorization: ''
                }
            });
            const content = res.data.obj;
            setPost(content);
        }
        if (active != undefined) {
            asyncFunc();
        }

    }, [active])

    /**
     * search onChange
     * 模糊查询
     */
    async function search(str) {
        if (str == undefined || str == '') {
            return;
        }
        const res = await axios.get(`${fuzzyQueryPost}?str=${str}`);
        setPost(res.data.obj)
    }

    return (

        <div className={styles.container}>
            <div className={styles.title}>
                <h2>New Posts in {currentCity} <span className='iconfont icon-zhongzhi' title='reload' onClick={reload}></span></h2>
            </div>
            <div className={styles.tags}>
                <Chip className={classes.tags}
                    onClick={reload}
                    style={{ backgroundColor: '#688DFF', color: 'white' }} size='small' label='All' />
                {showTags}
            </div>
            <div>
                <TextField
                    onChange={(e) => { search(e.target.value) }}
                    className={classes.newssearch} size='small' variant='outlined' label='Search Content' color='secondary' />
            </div>
            <div className={styles.newscontainer}>
                {elements}

                {/* <div className={styles.newsbox}>
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
                                }} src={BoyDemo} />
                            </div>
                            <div className={styles.name}>Tommy</div>
                            <div className={styles.time}>2023.10.15</div>
                            <div className={styles.minute}>2:30 PM</div>
                        </Box>
                        <Box sx={{
                            display: 'grid',
                            gap: '0.3rem'
                        }}>
                            <div>
                                <span style={{
                                    color: '#633194'
                                }}>Event: </span> Mayday Parade Concert
                            </div>
                            <div>
                                <span style={{
                                    color: '#633194'
                                }}>Time: </span> 2024.10.25
                            </div>
                            <div>
                                <span style={{
                                    color: '#633194'
                                }}>Comment: </span> Wanna Go to Mayday Parade Concert?
                            </div>
                            <div>
                                <Button variant='contained' className={classes.requestbtn} size='small'>Send Request</Button>
                                <span>Now 12 people have already interested</span>
                            </div>
                        </Box>
                    </Box>
                </div> */}
            </div>
            <ToastContainer />
        </div>

    )
}
