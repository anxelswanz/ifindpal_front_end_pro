import React, { useState } from 'react'
import styles from './select.module.css'
import Art from '../../assets/img/art.png'
import Sports from '../../assets/img/Sports.png'
import Event from '../../assets/img/event.png'
import Gaming from '../../assets/img/games.png'
import Header from '../../components/Header/Header'
import Logo from '../../assets/brand/logo.png'
import { useNavigate } from 'react-router-dom'
export default function Select() {

    const [theme, setTheme] = useState('');
    const navigate = useNavigate();
    /**
     * Navigate to home page
     */
    function goHomePage(theme, index) {
        setTheme(theme);
        console.log('select', theme);
        localStorage.setItem('themeId', index)
        navigate(`/home/news?theme=${theme}`);
    }
    return (

        <div className={styles.box}>
            <div style={{
                textAlign: 'center',

            }}>
                <img src={Logo} style={{
                    marginTop: '4rem',
                    width: '6rem',
                    height: '6rem'
                }} />
            </div>
            <div style={{
                textAlign: 'center',
                font: '2rem',
                color: 'white',
                marginBottom: '5rem',
                paddingTop: '1rem'
            }}>
                <h2>Welcome ! Please select your event of interest</h2>
            </div>
            <div class={styles.container}>
                <div onClick={() => { goHomePage('Art%26Music', 1) }} class={styles.glass} style={{ '--var': -15 }} data-text="Art & Music">
                    <img className={styles.img} src={Art} />
                </div>
                <div onClick={() => { goHomePage('Sports', 2) }} class={styles.glass} style={{ '--var': 20 }} data-text="Sports">
                    <img className={styles.img} src={Sports} />
                </div>
                <div onClick={() => { goHomePage('Gaming', 3) }} class={styles.glass} style={{ '--var': -10 }} data-text="Gaming">
                    <img className={styles.img} src={Gaming} />
                </div>
                <div onClick={() => { goHomePage('Event', 4) }} class={styles.glass} style={{ '--var': 13 }} data-text="Event">
                    <img className={styles.img} src={Event} />
                </div>
            </div>
        </div>

    )
}
