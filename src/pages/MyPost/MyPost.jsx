import React, { useEffect, useState } from 'react'
import styles from './mypost.module.css'
import {
    Button, makeStyles, Dialog,
    DialogContent, DialogContentText, DialogActions,
    ListItemAvatar, List, DialogTitle, Avatar, ListItemText, ListItem
} from '@material-ui/core'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getPostByUserId } from '../../api/Api';
import download from '../../assets/img/download.gif'
import { deletePostById } from '../../api/Api';
import { getJoinUsers } from '../../api/Api';
const useStyles = makeStyles({
    okbtn: {
        marginTop: '0.6rem',
        color: 'white',
        backgroundColor: '#8A59D6',
        borderRadius: '5px',
        '&:hover': {
            backgroundColor: '#6B2ECB',
            boxShadow: 'none',
        }
    },
    deletebtn: {
        position: 'absolute',
        right: '8rem',
        backgroundColor: 'red',
        color: 'white',
        borderRadius: '15px',
    },
    seejoinusersbtn: {
        color: 'white',
        position: 'absolute',
        right: '0.3rem',
        borderRadius: '15px',
    },
    avatar: {
        marginRight: '0.5rem'
    }
})

export default function MyPost() {
    const classes = useStyles();
    const navigate = useNavigate();
    const [user, setUser] = useState();
    const [posts, setPosts] = useState([]);
    /**
     * isLoading
     */
    const [isLoading, setIsLoading] = useState(true);

    /**
     * 展示user dialog
     */

    const [open, setOpen] = React.useState(false);
    const [message, setMessage] = useState();
    const [contactInfo, setContactInfo] = useState();

    /**
     * 查询participants数据
     */
    const [participants, setParticipants] = useState([]);
    const handleClickOpen = async (postId) => {
        console.log(postId);
        setParticipants([]);
        const data = await axios.get(`${getJoinUsers}?postId=${postId}`);
        setParticipants(data.data.obj)
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    /**
     * 返回主页
     */
    function backToHome() {
        navigate('/home/news')
    }
    useEffect(() => {
        const userJson = localStorage.getItem('user');
        const obj = JSON.parse(userJson);
        if (obj == undefined || obj == '' || obj == null) {
            navigate("/login");
        }
        setUser(obj.user);
        console.log(obj.user);
    }, [])
    /**
     * 加载post数据
     */
    useEffect(() => {

        const asyncFunc = async () => {
            try {
                const res = await axios.get(`${getPostByUserId}?userId=${user.userId}`);
                console.log(res);
                setPosts(res.data.obj);
            } catch (e) {
                console.log(e);
            }
            setTimeout(() => {
                setIsLoading(false);
            }, 1000)
        }
        asyncFunc();
    }, [user])

    /**
     * 删除post
     */
    const [deleteId, setDeleteId] = useState();
    async function del() {
        console.log('del', deleteId);
        const data = axios.get(`${deletePostById}?postId=${deleteId}`);
        window.location.reload();
    }
    const [openDel, setOpenDel] = React.useState(false);

    const handleClickOpenDel = (index) => {
        setDeleteId(index);
        setOpenDel(true);
    };

    const handleCloseDel = (str) => {
        if (str != 0) {
            del(str);
        }
        setOpenDel(false);
    };

    /**
     * 加载participants
     */
    const showParticipants = participants?.map((p) => {
        return <ListItem>
            <Avatar className={classes.avatar}>
                <img
                    src={p.avatar}
                    style={{
                        height: '2rem',
                        width: '2rem'
                    }} />
            </Avatar>
            {p.nickName}
        </ListItem>
    })

    const showPosts = posts?.map((post, index) => {
        const dateTime = post.eventDate.slice(0, 10);
        const exactTime = post.eventDate.slice(12, 16);
        const postId = post.postId;
        const eventName = post.eventName.length > 30 ? post.eventName.slice(0, 30) + '...' : post.eventName;
        return <div className={styles.mypostitem}>
            <span className={styles.inLinecontent}>{eventName}</span>
            <span className={styles.inLinecontent}>{dateTime}</span>
            <span className={styles.inLinecontent}>{exactTime}</span>
            <Button onClick={() => { handleClickOpenDel(postId) }} className={classes.deletebtn}>Delete</Button>
            <Dialog
                open={openDel}
                onClose={handleCloseDel}
                aria-labelledby="alert-delete-title"
            >
                <DialogTitle id="alert-delete-title">{"Are you sure to delete this post?"}</DialogTitle>
                <DialogActions>
                    <Button onClick={() => { handleCloseDel(1) }} color="secondary">
                        Yes
                    </Button>
                    <Button onClick={() => { handleCloseDel(0) }} color="secondary" autoFocus>
                        No
                    </Button>
                </DialogActions>
            </Dialog>
            <Button onClick={() => { handleClickOpen(post.postId) }} className={classes.seejoinusersbtn}>Participants</Button>
            <Dialog classes={classes.dialog} open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Participants</DialogTitle>
                <List autoFocus button>
                    {
                        showParticipants
                    }
                </List>
                <DialogActions>
                    <Button onClick={handleClose} color="secondary">
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    })

    return (
        <div>

            <div className={styles.box}>
                {
                    isLoading ? <img src={download} style={{
                        position: 'absolute',
                        display: 'flex',
                        width: '8rem',
                        height: '6rem',
                        marginLeft: '47%',
                        marginTop: '15rem',
                        justifyContent: 'center',
                        alignContent: 'center'
                    }} /> :
                        <div className={styles.container}>
                            <div className={styles.myposttitle}>
                                <h2>My Post</h2>
                            </div>
                            <div className={styles.allpost}>
                                {showPosts}

                            </div>
                            <Button variant='outlined'
                                onClick={backToHome}
                                className={classes.okbtn} color='primary'>OK!</Button>
                        </div>
                }
            </div>

        </div>
    )
}
