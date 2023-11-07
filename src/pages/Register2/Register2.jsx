import React, { useEffect, useId, useState } from 'react'
import styles from './register.module.css'
import Logo from '../../assets/brand/logo.png'
import { Button } from '@material-ui/core'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Autocomplete } from '@material-ui/lab';
import { TextField } from '@material-ui/core';
import { cities } from './cities';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { oneMoreStep } from '../../api/Api';

export default function Register2() {
    const [value, setValue] = useState('');
    const [avatar, setAvatar] = useState('https://api.dicebear.com/7.x/adventurer/svg?seed=George');
    const [nickName, setNickName] = useState('');
    const navigate = useNavigate();
    const toastOptions = {
        position: "bottom-right",
        autoClose: 9000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
    };
    const abc = ['123', '123', '9312'];
    async function submit() {
        if (value == '' || avatar == '' || nickName == '') {
            toast.error('Please fill all the information required', toastOptions)
            return;
        }

        const userJson = localStorage.getItem('user');
        if (userJson == null) {
            navigate('/login')
        } else {
            const user = JSON.parse(userJson);
            console.log('user=>', user);
            let userId = 0;
            /**
             * 解释
             * 1. user.user == undefined的情况
             * 就是register 完了直接进入 register2
             * 2. user.user != undefined 的情况
             * register结束回到login再来到register2
             */
            if (user.user == undefined) {
                userId = user.userId;
            } else {
                userId = user.user.userId;
            }
            console.log('userid =>', userId);
            const data = await axios.post(oneMoreStep, {
                currentCity: value,
                avatar: avatar,
                nickName: nickName,
                userId: userId,
            })
            console.log(data);
            if (data.data.code == 200) {
                const dataObj = data.data.obj;
                localStorage.setItem('user', JSON.stringify(dataObj));
                navigate('/login')
            } else {
                toast.error('System Error, Please try it again', toastOptions)
            }
        }

    }
    /**
     * create cityText for autocomplete
     */
    let cityText = [];
    useEffect(() => {
        for (let i = 0; i < cities.length; i++) {
            cityText.push(cities[i].en_name);
        }
    })

    /**
     * 检查用户状态
     * 如果localstorage没有用户就返回login界面
     */

    useEffect(() => {
        const userJson = localStorage.getItem('user');
        const user = JSON.parse(userJson);
        if (user.user == undefined) {
            if (user.userId == undefined) {
                navigate("/login");
            }
        }
        if (user.user != undefined) {
            if (user.user.userId = undefined) {
                navigate("/login");
            }
        }
    }, [])


    return (
        <div className={styles.container}>
            <div className={styles.registerbox}>
                <header>One More Step</header>
                <div>
                    <img src={Logo} style={{
                        width: '7rem',
                        height: '7rem',
                        marginBottom: '0.2rem'
                    }} />
                </div>
                <div className={styles.inputbox}>
                    <label style={{
                        marginRight: '3.8rem'
                    }}>Nick Name</label>
                    <input
                        type='text' onChange={(e) => { setNickName(e.target.value) }} placeholder='Enter Your User Name' />
                </div>
                <div className={styles.inputbox}>
                    <label style={{
                        marginRight: '1.5rem'
                    }}>Please select your current city</label>
                    <Autocomplete
                        onChange={(event, newValue) => { setValue(newValue) }}
                        value={value}
                        options={cityText}
                        color='primary'
                        renderInput={(params) => <TextField {...params} label='Find City' />} />
                </div>

                <div className={styles.inputbox}>
                    <label style={{
                        marginRight: '1.5rem'
                    }}>Please choose your avatar<img src={avatar} className={styles.img} style={{
                        position: 'absolute',
                        top: '-1rem'
                    }} />  </label>

                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignContent: 'center',
                        marginTop: '1rem'
                    }}>
                        <a onClick={() => { setAvatar("https://api.dicebear.com/7.x/adventurer/svg?seed=George") }} style={{
                            cursor: 'pointer',
                            marginLeft: '0.5rem'
                        }}>
                            <img src="https://api.dicebear.com/7.x/adventurer/svg?seed=George" className={styles.img} />
                        </a>
                        <a onClick={() => { setAvatar("https://api.dicebear.com/7.x/adventurer/svg?seed=Cookie") }} style={{
                            cursor: 'pointer',
                            marginLeft: '0.5rem'
                        }}>
                            <img src="https://api.dicebear.com/7.x/adventurer/svg?seed=Cookie" className={styles.img} />
                        </a>
                        <a onClick={() => { setAvatar("https://api.dicebear.com/7.x/adventurer/svg?seed=Oscar") }} style={{
                            cursor: 'pointer',
                            marginLeft: '0.5rem'
                        }}>
                            <img src="https://api.dicebear.com/7.x/adventurer/svg?seed=Oscar" className={styles.img} />
                        </a>
                        <a onClick={() => { setAvatar("https://api.dicebear.com/7.x/adventurer/svg?seed=Jasper") }} style={{
                            cursor: 'pointer',
                            marginLeft: '0.5rem'
                        }}>
                            <img src="https://api.dicebear.com/7.x/adventurer/svg?seed=Jasper" className={styles.img} />
                        </a>

                        <a onClick={() => { setAvatar("https://api.dicebear.com/7.x/adventurer/svg?seed=Daisy") }} style={{
                            cursor: 'pointer',
                            marginLeft: '0.5rem'
                        }}>
                            <img src="https://api.dicebear.com/7.x/adventurer/svg?seed=Daisy" className={styles.img} />
                        </a>

                        <a onClick={() => { setAvatar("https://api.dicebear.com/7.x/adventurer/svg?seed=Sasha44434") }} style={{
                            cursor: 'pointer',
                            marginLeft: '0.5rem'
                        }}>
                            <img src="https://api.dicebear.com/7.x/adventurer/svg?seed=Sasha44434" className={styles.img} />
                        </a>

                        <a onClick={() => { setAvatar("https://api.dicebear.com/7.x/adventurer/svg?seed=Lily") }} style={{
                            cursor: 'pointer',
                            marginLeft: '0.5rem'
                        }}>
                            <img src="https://api.dicebear.com/7.x/adventurer/svg?seed=Lily" className={styles.img} />
                        </a>
                    </div>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignContent: 'center',
                        marginTop: '1rem'
                    }}>
                        <a onClick={() => { setAvatar("https://api.dicebear.com/7.x/adventurer/svg?seed=Samantha") }} style={{
                            cursor: 'pointer',
                            marginLeft: '0.5rem'
                        }}>
                            <img src="https://api.dicebear.com/7.x/adventurer/svg?seed=Samantha" className={styles.img} />
                        </a>
                        <a onClick={() => { setAvatar("https://api.dicebear.com/7.x/adventurer/svg?seed=Annie") }} style={{
                            cursor: 'pointer',
                            marginLeft: '0.5rem'
                        }}>
                            <img src="https://api.dicebear.com/7.x/adventurer/svg?seed=Annie" className={styles.img} />
                        </a>
                        <a onClick={() => { setAvatar("https://api.dicebear.com/7.x/adventurer/svg?seed=Cuddles") }} style={{
                            cursor: 'pointer',
                            marginLeft: '0.5rem'
                        }}>
                            <img src="https://api.dicebear.com/7.x/adventurer/svg?seed=Cuddles" className={styles.img} />
                        </a>
                        <a onClick={() => { setAvatar("https://api.dicebear.com/7.x/adventurer/svg?seed=Sheba") }} style={{
                            cursor: 'pointer',
                            marginLeft: '0.5rem'
                        }}>
                            <img src="https://api.dicebear.com/7.x/adventurer/svg?seed=Sheba" className={styles.img} />
                        </a>

                        <a onClick={() => { setAvatar("https://api.dicebear.com/7.x/adventurer/svg?seed=asd") }} style={{
                            cursor: 'pointer',
                            marginLeft: '0.5rem'
                        }}>
                            <img src="https://api.dicebear.com/7.x/adventurer/svg?seed=asd" className={styles.img} />
                        </a>

                        <a onClick={() => { setAvatar("https://api.dicebear.com/7.x/adventurer/svg?seed=312wedasd") }} style={{
                            cursor: 'pointer',
                            marginLeft: '0.5rem'
                        }}>
                            <img src="https://api.dicebear.com/7.x/adventurer/svg?seed=312wedasd" className={styles.img} />
                        </a>


                        <a onClick={() => { setAvatar("https://api.dicebear.com/7.x/adventurer/svg?seed=sddssdddda") }} style={{
                            cursor: 'pointer',
                            marginLeft: '0.5rem'
                        }}>
                            <img src="https://api.dicebear.com/7.x/adventurer/svg?seed=sddssdddda" className={styles.img} />
                        </a>
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
                    }}> Create an account now</button>

            </div>
            <ToastContainer />
        </div >

    )
}
