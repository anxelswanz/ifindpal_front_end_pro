import React from 'react'
import { useNavigate } from 'react-router-dom'
import logo from '../../assets/brand/logo.png'
import styles from './start.module.css'
import { Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core';
const useStyles = makeStyles({
    startbutton: {
        marginTop: '3rem',
        marginBottom: '2rem',
        width: '20rem !important',
        height: '5rem',
        color: 'white',
        borderRadius: '15px',
        fontSize: '1rem',
        '&:hover': {
            backgroundColor: '#AA3E99',
            boxShadow: 'none',
        },
        transition: '1.5s'
    }
})
export default function Start() {
    const classes = useStyles()
    const navigate = useNavigate()
    function submit() {
        navigate('/login');
    }
    return (
        <div className={styles.container}>
            <div className={styles.startbox} style={{
                marginTop: '6rem'
            }}>
                <img src={logo} style={{
                    width: '15rem',
                    height: '15rem'
                }} />
                <h2 style={{
                    color: 'white'
                }}>Find Your Pal of Common Interest in Your City</h2>
                <Button size='large'
                    onClick={submit}
                    className={classes.startbutton} variant='outlined'>Get Started</Button>
                <h5>Developed & powered  by anxelswanz/ronghui</h5>
            </div>
        </div>
    )
}
