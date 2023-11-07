import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './welcome.module.css'
import womanok from '../../assets/img/woman_ok.png'
import fireworks from '../../assets/img/fireworks.gif'
export default function Welcome() {
    const navigate = useNavigate();
    const [nickName, setNickName] = useState();

    useEffect(() => {
        const user = localStorage.getItem('user');
        if (user === '' || user === null || user === undefined) {
            navigate('/login');
        }
        const userObj = JSON.parse(user);

        const obj = userObj.user;
        setNickName(obj.nickName);
        setTimeout(() => {
            navigate('/select')
        }, 4000)
    })
    return (
        <div className={styles.container}>
            <div className={styles.successbox}>
                <div style={{
                    marginTop: '12rem'
                }}>
                    <img src={fireworks} style={{
                        width: '15rem',
                        height: '15rem'
                    }} />
                    <img src={womanok} style={{
                        width: '15rem',
                        height: '15rem'
                    }} />
                    <div style={{
                        marginTop: '4rem',
                        fontSize: '2rem'
                    }}>
                        Welcome {nickName} , Let's find out more today!
                    </div>
                </div>
            </div>


        </div>
    )
}
