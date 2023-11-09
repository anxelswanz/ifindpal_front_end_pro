import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './login.css';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import axios from 'axios';
import { loginRoute } from '../../api/Api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import WAIT from '../../assets/img/Please_wait.gif'
const useStyles = makeStyles({
    backtohomebutton: {
        width: '60%',
        height: '2rem',
        color: 'white',
        borderRadius: '5px',
        fontSize: '10px',
        '&:hover': {
            backgroundColor: '#6B2ECB',
            boxShadow: 'none',
        }
    },
    buttonsignin: {
        width: '90%',
        height: '2rem',
        color: 'white',
        backgroundColor: '#8A59D6',
        borderRadius: '5px',
        '&:hover': {
            backgroundColor: '#6B2ECB',
            boxShadow: 'none',
        }
    }
})

export default function Login() {
    const classes = useStyles();
    const navigate = useNavigate();
    const [userName, setUserName] = useState();
    const [password, setPassword] = useState();
    /**
     * Return to Home Page
     */
    function gobacktohome() {
        navigate('/start')
    }
    /**
     * Go to register 
     */

    function goToRegister() {
        navigate('/register')
    }
    /**
     * to welcome
     */
    const toastOptions = {
        position: "bottom-right",
        autoClose: 9000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
    };

    const [isLoading, setIsLoading] = useState(false);
    async function toWelcome() {
        if (userName === '' || password === '') {
            toast.error('The user name or password must not be empty', toastOptions);
            return;
        }
        setIsLoading(true);
        try {
            const data = await axios.post(loginRoute, {
                userName,
                password
            }, {
                headers: {
                    authorization: null,
                }
            })
            if (data.data.code == 200) {
                const user = data.data.obj;
                localStorage.setItem('user', JSON.stringify(user));
                navigate('/welcome')
            }
            setIsLoading(false);
        } catch (e) {
            toast.error('Incorrect username or password', toastOptions);
            setIsLoading(false);
        }
        toast.error('Incorrect username or password', toastOptions);
        setIsLoading(false);
    }
    return (
        <div>
            <section>
                <div class="color"></div>
                <div class="color"></div>
                <div class="color"></div>
                <div class="line">
                    <div class="slide-circle">
                        <i style={{ 'color': 'white', 'font-size': '2rem' }} class="fa-solid fa-rocket"></i>
                    </div>
                </div>
                {
                    isLoading ?
                        <img src={WAIT} /> :
                        <div class="container">
                            <form>
                                <h3 class="login-welcome">Welcome to <span>ifindpal</span></h3>
                                <h2 class="login-title">LOGIN</h2>
                                <div class="input-box">
                                    <input type="text" placeholder="User Name" onChange={(e) => { setUserName(e.target.value) }} />
                                </div>
                                <div class="input-box">
                                    <input type="password" placeholder="password" onChange={(e) => { setPassword(e.target.value) }} />
                                </div>
                                <Button onClick={toWelcome} className={classes.buttonsignin} variant='outlined' size='small' >Sign In</Button>

                                <p class="sign-up">Don't have an account? <a class="sign-up-buttom" onClick={goToRegister} style={{ cursor: 'pointer' }}>Sign Up</a></p>
                                <Button onClick={gobacktohome} startIcon={<KeyboardBackspaceIcon />} className={classes.backtohomebutton} size='small' >Go back</Button>
                            </form>
                        </div>
                }

            </section>
            <ToastContainer />
        </div>
    )
}
