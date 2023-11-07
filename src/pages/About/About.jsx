import React from 'react'
import Header from '../../components/Header/Header'
import styles from './about.module.css'
import logo2 from '../../assets/brand/logo2.png'
import ansel from '../../assets/brand/anselz.jpg'
import { Card } from '@material-ui/core'
export default function About() {
    return (
        <div className={styles.container}>
            <Header />
            <div className={styles.box}>
                <div className={styles.smallbox}>
                    <div><img src={logo2} style={{
                        width: '10rem',
                        height: '10rem'
                    }} /></div>
                    <div style={{
                        marginLeft: '6rem',
                        color: 'white',

                    }}>
                        <span style={{
                            fontSize: '2rem'
                        }}>ifindpal version 1.0 </span> <br />
                        <span style={{
                            marginLeft: '1rem'
                        }}>released by anxelswanz </span>
                    </div>

                </div>
                <div
                    className={styles.author}
                    style={{
                        marginTop: '4rem'
                    }}
                >
                    <img
                        style={{
                            width: '10rem',
                            height: '10rem',
                            borderRadius: '3rem',
                            boxShadow: '10px 10px #6B2ECB'
                        }}
                        src={ansel} />
                    <div

                        style={{
                            width: '20rem',
                            height: '10rem',
                            marginLeft: '3rem',
                            color: 'white'
                        }}
                    >
                        About the developer Ansel / Ronghui Zhong <br />
                        <span style={{
                            color: '#F5F54A'
                        }}>
                            Hello! I am Ansel, I hope this website could help anyone that hopes to find a pal
                            to do any event or any activity! Find the people of common interest and join the group!
                        </span> <br />
                        Any problem or question please email: <span style={{ color: '#E474BA' }}>anxelswanz@outlook.com </span><br />
                        or go straight to ask me on instagram: <span style={{ color: '#E474BA' }}>anxelswanz </span>
                    </div>
                </div>
            </div>
        </div>
    )
}
