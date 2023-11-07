import React, { useEffect, useState } from 'react'
import styles from './msgbox.module.css'
import {
  Button, makeStyles, Dialog,
  DialogContent, DialogContentText, DialogActions,
  DialogTitle, TextField
} from '@material-ui/core'
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getPersonalMsg } from '../../api/Api';
import { setMsgRead } from '../../api/Api';
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

export default function MsgBox() {
  const classes = useStyles();
  const navigate = useNavigate();
  const [user, setUser] = useState();
  const [msgs, setMsgs] = useState([]);
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
   * 加载Msg数据
   */
  useEffect(() => {

    const asyncFunc = async () => {
      try {
        console.log(user);
        const res = await axios.get(`${getPersonalMsg}?userId=${user.userId}`);
        console.log(res.data);
        if (res.data.obj.firstMet != undefined || res.data.obj.firstMet != null) {
          navigate(`/firstMatch?name=${res.data.obj.firstMet}`)
        }
        const messages = res.data.obj
        setMsgs(messages);
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
  const [messageId, setMessageId] = useState();
  const [senderInfo, setSenderInfo] = useState();
  const handleClickOpen = (msgId, info) => {
    setMessageId(msgId);
    setSenderInfo(info)
    setOpen(true);
  };

  const handleClose = async () => {
    const res = await axios.get(`${setMsgRead}?messageId=${messageId}`);
    setOpen(false);
    window.location.reload();
  };



  /**
   * 遍历 pals
   */
  const showMsgs = msgs?.map((m, index) => {

    return <div
      className={styles.mypostitem} >
      <img style={{
        width: '2rem',
        height: '2rem',
        marginRight: '1rem'
      }} src={m.senderAvatar} />
      <span className={styles.inLinecontent}>{m.senderName}</span>
      <span className={styles.inLinecontent}>{m.createTime}</span>
      <Button onClick={() => { handleClickOpen(m.messageId, m.senderInfo) }} className={classes.dropmsgbtn}>See Message</Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Write a message !</DialogTitle>
        <DialogContent>
          {senderInfo}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => { handleClose(); }} color="secondary">
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
                <h2>Message</h2>
              </div>
              <div className={styles.allpost}>
                {showMsgs}
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
