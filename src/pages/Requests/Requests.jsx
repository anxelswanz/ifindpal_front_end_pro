import React, { useEffect, useState } from 'react'
import styles from './requests.module.css'
import {
  Button, makeStyles, Dialog,
  DialogContent, DialogContentText, DialogActions,
  ListItemAvatar, List, DialogTitle, Avatar, ListItemText, ListItem
} from '@material-ui/core'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getMessageByUserId } from '../../api/Api';
import download from '../../assets/img/download.gif'
import { deletePostById } from '../../api/Api';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { messageHandling } from '../../api/Api';
import { ToastContainer, toast } from 'react-toastify';
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
  detailbtn: {
    position: 'absolute',
    right: '14rem',
    color: 'white',
  },
  deletebtn: {
    position: 'absolute',
    right: '8rem',
    backgroundColor: 'red',
    color: 'white',
    borderRadius: '15px',
  },
  acceptbtn: {
    position: 'absolute',
    right: '2rem',
    backgroundColor: 'green',
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

export default function Requests() {
  const classes = useStyles();
  const navigate = useNavigate();
  const [user, setUser] = useState();
  const [requests, setRequests] = useState([]);
  /**
   * isLoading
   */
  const [isLoading, setIsLoading] = useState(true);



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
        console.log(user);
        const res = await axios.get(`${getMessageByUserId}?userId=${user.userId}`);
        console.log(res);
        setRequests(res.data.obj)
      } catch (e) {
        console.log(e);
        //navigate('/login')
      }
      setTimeout(() => {
        setIsLoading(false);
      }, 1000)
    }
    asyncFunc();
  }, [user])


  /**
   * 点击弹出申请人comment和contact详情
   */
  const [open, setOpen] = useState(false);
  const [selectedDialog, setSelectedDialog] = useState();
  const handleClickOpen = (index) => {
    setSelectedDialog(index);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  /**
   * 处理request
   */

  const handleReq = async (index, messageId) => {
    let message = {};
    message.ifAccepted = index;
    message.messageId = messageId;
    const data = await axios.post(messageHandling, message);
    toast.success("ok");
    setTimeout(() => {
      window.location.reload();
    }, 1500)

  }

  const showRequests = requests?.map((req, index) => {
    return <div
      className={styles.mypostitem} >
      <img style={{
        width: '2rem',
        height: '2rem',
        marginRight: '1rem'
      }} src={req.senderAvatar} />
      <span className={styles.inLinecontent}>{req.senderName}</span>
      <span className={styles.inLinecontent}>{req.createTime}</span>
      <Button startIcon={<ChevronLeftIcon />}
        variant='outlined' onClick={() => { handleClickOpen(index) }}
        className={classes.detailbtn}>Detail</Button>
      <Button onClick={() => { handleReq(2, req.messageId) }} className={classes.deletebtn}>Decline</Button>
      <Button onClick={() => { handleReq(1, req.messageId) }} className={classes.acceptbtn}>Accept</Button>

      <Dialog
        open={open && selectedDialog === index ? true : false}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Request Information"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {req.senderInfo ? req.senderInfo : 'Not Provided'}
          </DialogContentText>
        </DialogContent>
        <DialogTitle id="alert-dialog-title">{"Request Contact"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {req.senderContact ? req.senderContact : 'Not Provided'}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary" autoFocus>
            Close
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
                <h2>Requests</h2>
              </div>
              <div className={styles.allpost}>
                {showRequests}
              </div>
              <Button variant='outlined'
                onClick={backToHome}
                className={classes.okbtn} color='primary'>OK!</Button>
            </div>
        }
      </div>
      <ToastContainer />
    </div>
  )
}
