import React, { useEffect, useState } from 'react'
import styles from './editprofile.module.css'
import Logo from '../../assets/brand/logo.png'
import { Button, TextField } from '@material-ui/core'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { registerRoute } from '../../api/Api'
import { useNavigate } from 'react-router-dom';
import download from '../../assets/img/download.gif'
import { updateUser } from '../../api/Api';
export default function Register() {
    const [email, setEmail] = useState('');
    const [gender, setGender] = useState('');
    const [user, setUser] = useState();
    const [nickName, setNickName] = useState('')
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const toastOptions = {
        position: "bottom-right",
        autoClose: 9000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
    };
    /**
     * 获取user信息
     */
    useEffect(() => {

        const userJson = localStorage.getItem('user');
        if (userJson == undefined || userJson == '' || userJson == null) {
            navigate('/login')
        }
        const obj = JSON.parse(userJson);
        const user = obj.user;
        setUser(user);

        if (gender == '' || gender == undefined) {
            setGender(obj.user.gender);
        }
        if (nickName == '') {
            setNickName(obj.user.nickName);
        }
        if (email == '') {
            setEmail(obj.user.email);
        }

        setTimeout(() => {
            if (user) {
                setIsLoading(false);
            }
        }, 1000)

    }, [])
    console.log('user', user);
    async function submit() {
        /**
         * 重新放入user
         */
        const userJson = localStorage.getItem('user');
        let obj = JSON.parse(userJson);
        if (email != obj.user.email) {
            obj.user.email = email;
        }
        if (nickName != user.nickName) {
            obj.user.nickName = nickName;
        }
        localStorage.setItem('user', JSON.stringify(obj));

        try {
            const res = await axios.post(updateUser, {
                nickName: nickName,
                email: email,
                userId: user.userId,
            })
            navigate('/home/news')
        } catch (e) {
            navigate('/home/news')
        }


    }


    return (
        <div className={styles.container} >
            {
                isLoading ? <img src={download} style={{
                    display: 'flex',
                    width: '8rem',
                    height: '6rem',
                    marginLeft: '47%',
                    marginTop: '15rem',
                    justifyContent: 'center',
                    alignContent: 'center'
                }} />
                    : <div className={styles.registerbox}>
                        <header>Edit Profile</header>
                        <div>
                            <img src={user.avatar} style={{
                                width: '4rem',
                                height: '4rem',
                                // marginBottom: '0.8rem'
                            }} />
                        </div>
                        <div className={styles.inputbox}>
                            <label style={{
                                marginRight: '3.8rem'
                            }}>Nick Name</label>
                            <input type='text' onChange={(e) => { setNickName(e.target.value) }} placeholder={user.nickName} />
                        </div>
                        <div className={styles.inputbox}>
                            <label style={{
                                marginRight: '3.8rem'
                            }}>User Name</label>
                            <input readOnly type='text' placeholder={user.userName} />
                        </div>
                        <div className={styles.inputbox}>
                            <label style={{
                                marginRight: '6.4rem'
                            }}>Email</label>
                            <input type='email' onChange={(e) => { setEmail(e.target.value) }} placeholder={user.email} />
                        </div>

                        <div style={{
                            display: 'flex',
                            marginTop: '1.5rem',
                            marginLeft: '1.5rem'
                        }}>


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
            }

            <ToastContainer />
        </div >

    )
}
