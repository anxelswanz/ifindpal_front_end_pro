import React, { useEffect, useState } from 'react'
import styles from './register.module.css'
import Logo from '../../assets/brand/logo.png'
import { Button, TextField } from '@material-ui/core'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { registerRoute } from '../../api/Api'
import { useNavigate } from 'react-router-dom';
export default function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [cpassword, setCpassword] = useState('');
    const [email, setEmail] = useState('');
    const [gender, setGender] = useState('');
    const [invitation, setInvitation] = useState('');
    const navigate = useNavigate();
    const toastOptions = {
        position: "bottom-right",
        autoClose: 9000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
    };
    async function submit() {

        if (gender == '') {
            toast.error('Gender cannot be empty', toastOptions)
        } else if (username.length < 3 || username.length > 20) {
            toast.error('User name must be within 3 to 20 letters', toastOptions)
        } else if (password.length < 6 || password.length > 20) {
            toast.error('Password must be within 6 to 20 letters', toastOptions)
        } else if (password !== cpassword) {
            toast.error('Second password does not conform to the first one', toastOptions)
        } else if (invitation != '20231103AAA') {
            toast.error('Wrong Invitation Code', toastOptions);
        }
        else {
            const data = await axios.post(registerRoute, {
                userName: username,
                password,
                email,
                gender
            })
            if (data.data.code == 200) {
                const dataObj = data.data.obj;
                console.log(data);
                localStorage.setItem('user', JSON.stringify(dataObj));
                navigate('/beforeSignIn')
            } else {
                if (data.data.obj == "USERNAMEUSED") {
                    toast.error('Sorry, user name was used, please try another one', toastOptions)
                    return;
                }
                toast.error('System Error, Please try it again', toastOptions)
            }
        }

    }

    useEffect(() => {

    }, [username, password, email, cpassword, gender])
    return (
        <div className={styles.container} >
            <div className={styles.registerbox}>
                <header>Register</header>
                <div>
                    <img src={Logo} style={{
                        width: '7rem',
                        height: '7rem',
                        // marginBottom: '0.8rem'
                    }} />
                </div>
                <span>Invitation Code</span> <TextField onChange={(e) => { setInvitation(e.target.value) }} />
                <div className={styles.inputbox}>
                    <label style={{
                        marginRight: '3.8rem'
                    }}>User Name</label>
                    <input type='text' onChange={(e) => { setUsername(e.target.value) }} placeholder='Enter Your User Name' />
                </div>
                <div className={styles.inputbox}>
                    <label style={{
                        marginRight: '6.4rem'
                    }}>Email</label>
                    <input type='email' onChange={(e) => { setEmail(e.target.value) }} placeholder='Enter Your Email' />
                </div>
                <div className={styles.inputbox}>
                    <label style={{
                        marginRight: '4.8rem'
                    }}>Password</label>
                    <input type='password' onChange={(e) => { setPassword(e.target.value) }} placeholder='Enter Your Password' />
                </div>

                <div className={styles.inputbox}>
                    <label>Confirm Password</label>
                    <input type='password' onChange={(e) => { setCpassword(e.target.value) }} placeholder='Enter Your Password' />
                </div>
                <div style={{
                    display: 'flex',
                    marginTop: '1.5rem',
                    marginLeft: '1.5rem'
                }}>

                    <span>    Your Gender:</span>
                    <div className={styles.gender}>
                        <input type='radio' id='male' name='gender'
                            onClick={() => { setGender(1) }}
                        />
                        <label for='check'>Male</label>
                    </div>
                    <div className={styles.gender}>
                        <input type='radio' id='female' name='gender'
                            onClick={() => { setGender(2) }}
                        />
                        <label for='check'>Female</label>
                    </div>
                    <div className={styles.gender}>
                        <input type='radio' id='nb' name='gender'
                            onClick={() => { setGender(3) }}
                        />
                        <label for='check'>Non Binary</label>
                    </div>
                </div>
                <button
                    onClick={submit}
                    style={{
                        marginTop: '2rem',
                        border: 'none',
                        color: 'white',
                        backgroundColor: '#8A59D6',
                        width: '10rem',
                        height: '2rem',
                        borderRadius: '10px',
                        cursor: 'pointer'
                    }}> Save</button>

            </div>
            <ToastContainer />
        </div >

    )
}
