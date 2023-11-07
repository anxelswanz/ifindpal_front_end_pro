import React, { useEffect } from 'react'
import styles from './header.module.css'
import { Button, Dialog } from '@material-ui/core'
import { makeStyles, Menu, MenuItem } from '@material-ui/core'
import Logo from '../../assets/brand/logo.png'
import AnonymousUser from '../../assets/img/anonymous.png'
import { useState } from 'react'
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import Slide from '@material-ui/core/Slide';
import axios from 'axios'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { logoutRoute } from '../../api/Api.js'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom'
import FaceIcon from '@material-ui/icons/Face';
import EmailIcon from '@material-ui/icons/Email';
import AddCircleIcon from '@material-ui/icons/AddCircle';
const useStyles = makeStyles({
  button: {
    width: '3rem',
    height: '2.5rem',
  },
  logoutbtn: {
    color: 'white',
    '&:hover': {
      backgroundColor: 'red',
      boxShadow: 'none',
      color: 'white'
    }
  },
  backToThemeBtn: {
    color: 'white',
    '&:hover': {
      backgroundColor: '#688CFE',
      boxShadow: 'none',
      color: 'white'
    }
  },
  yesnobtn: {
    color: 'red'
  },
  msgbtn: {
    marginRight: '2rem'
  }
})

export default function Header() {


  const classes = useStyles();
  const navigate = useNavigate();
  /**
   * user 
   */
  const [user, setUser] = useState({});
  const [userId, setUserId] = useState();
  const [token, setToken] = useState();
  useEffect(() => {
    const userJson = localStorage.getItem('user');
    const userObj = JSON.parse(userJson);
    //如果用户为空，跳转登陆页面
    if (userObj === null || userObj === '') {
      navigate('/login')
      return;
    }
    setUser(userObj.user);
    setUserId(userObj.userId);
    setToken(userObj.token);
    console.log(user);
  }, [])

  /**
   * Dialog 对话框
   */
  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = async (e) => {
    setOpen(false);
    if (e === 'yes') {
      console.log(token);
      try {
        axios.interceptors.request.use(
          config => {
            config.headers.authorization = token;
            return config
          }
        )
        const data = await axios.get(logoutRoute, userId)
        localStorage.setItem('user', null);
      } catch (e) {
        toast.error('System Error')
      }
      navigate('/login');
    }
    window.location.reload();
  };
  useEffect(() => {

  }, [open])
  /**
   *  menu 
   */
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose2 = (index) => {
    setAnchorEl(null);
    if (index == 1) {
      navigate('/editprofile')
    }
    if (index == 2) {
      navigate('/mypost')
    }
    if (index == 3) {
      navigate("/requests")
    }
  };
  return (
    <div className={styles.container}>
      <Button
        onClick={() => { navigate('/select') }}
        startIcon={<ArrowBackIosIcon />}
        className={classes.backToThemeBtn}
        variant='outlined'>Back to Theme</Button>
      <div>
        <img style={{
          height: '4.2rem',
          width: '4.6rem'
        }} src={Logo} />
      </div>
      <Button color="primary" onClick={() => { navigate("/home/news") }} className={classes.button} >
        Home
      </Button>
      <Button color="primary" onClick={() => { navigate("/about") }} className={classes.button} >
        About
      </Button>

      <div style={{
        marginLeft: '1rem'
      }}>
        {
          user !== '{}' ?
            <div className={styles.userAvatar}>
              <img src={user.avatar} style={{
                width: '3rem',
                height: '3rem',
                verticalAlign: 'middle'
              }} />
              <span>{user.nickName}</span>
            </div>
            :
            <div>
              <img src={AnonymousUser} />
            </div>
        }
      </div>
      <div>
        <Button
          onClick={() => { navigate("/messagebox") }}
          className={classes.msgbtn} color='primary' aria-controls="simple-menu" aria-haspopup="true" >
          <EmailIcon color='primary' />
        </Button>
        <Button
          onClick={() => { navigate("/home/post") }}
          className={classes.msgbtn} color='primary' aria-controls="simple-menu" aria-haspopup="true" >
          <AddCircleIcon color='primary' />
        </Button>
        <Button color='primary' aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
          <FaceIcon color='primary' /> info
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose2}
        >
          <MenuItem onClick={() => { handleClose2(1) }}>Edit Profile</MenuItem>
          <MenuItem onClick={() => { handleClose2(2) }}>My Post</MenuItem>
          <MenuItem onClick={() => { handleClose2(3) }}>Request</MenuItem>
        </Menu>
      </div>
      <div>
        <Button
          variant='outlined'
          size='small'
          className={classes.logoutbtn}
          onClick={handleClickOpen}
        >Log out</Button>
      </div>

      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">{"Are you sure to log out?"}</DialogTitle>
        <DialogActions>
          <Button onClick={() => { handleClose('yes') }} className={classes.yesnobtn}>
            Yes, I'll leave now
          </Button>
          <Button onClick={() => { handleClose('no') }} color="secondary">
            No, I'll stay
          </Button>
        </DialogActions>
      </Dialog>
      <ToastContainer />
    </div>
  )
}
