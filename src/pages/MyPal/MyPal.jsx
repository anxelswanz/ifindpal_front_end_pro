import React, { useEffect, useState } from 'react'
import styles from './mypal.module.css'
import {
  Button, makeStyles, Dialog,
  DialogContent, DialogContentText, DialogActions,
  DialogTitle, TextField
} from '@material-ui/core'
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { personalMsgHandling } from '../../api/Api';
import download from '../../assets/img/download.gif'
import { ToastContainer, toast } from 'react-toastify';
import { getPals } from '../../api/Api';
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
  dropmsgbtn: {
    position: 'absolute',
    right: '2rem',
    backgroundColor: '#291399',
    color: 'white',
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
  const [pals, setPals] = useState([]);
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
   * 加载Pal数据
   */
  useEffect(() => {

    const asyncFunc = async () => {
      try {
        const res = await axios.get(`${getPals}?userId=${user.userId}`);
        if (res.data.obj.firstMet != undefined || res.data.obj.firstMet != null) {
          navigate(`/firstMatch?name=${res.data.obj.firstMet}`)
        }
        const myPals = res.data.obj.pals;
        setPals(myPals);
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
   * drop a message
   */
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = useState();
  const [receiver, setReceiver] = useState();
  const [receiverId, setReceieverId] = useState();
  const handleClickOpen = (receiverId) => {
    setReceieverId(receiverId);
    setOpen(true);
  };

  const handleClose = async (index) => {
    if (index == 1) {
      const res = await axios.post(personalMsgHandling, {
        sender: user.userId,
        senderName: user.nickName,
        senderInfo: message,
        type: 'personal',
        senderAvatar: user.avatar,
        receiver: receiverId,
      })
      console.log(res);
    }
    setOpen(false);
  };



  /**
   * 遍历 pals
   */
  const showRequests = pals?.map((p, index) => {

    return <div
      className={styles.mypostitem} >
      <img style={{
        width: '2rem',
        height: '2rem',
        marginRight: '1rem'
      }} src={p.avatar} />
      <span className={styles.inLinecontent}>{p.nickName}</span>
      <Button onClick={() => { handleClickOpen(p.userId) }} className={classes.dropmsgbtn}>Drop a message</Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Write a message !</DialogTitle>
        <DialogContent>
          <textarea
            style={{
              width: '10rem',
              height: '4rem',
              border: 'none',
              outline: 'none'
            }}
            onChange={(e) => { setMessage(e.target.value) }}
            autoFocus
            margin="dense"
            id="name"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => { handleClose(0); }} color="secondary">
            Cancel
          </Button>
          <Button onClick={() => { handleClose(1) }} color="secondary">
            Send
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
                <h2>My Pal</h2>
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
