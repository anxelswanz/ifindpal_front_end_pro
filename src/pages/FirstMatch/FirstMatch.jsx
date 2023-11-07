import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './firstMatch.module.css'
import successWoman from '../../assets/img/success_woman.png'
import greenFireworks from '../../assets/img/green_fireworks.gif'
import { useSearchParams } from 'react-router-dom'
export default function Welcome() {
    const navigate = useNavigate();
    const [title, setTitle] = useState();
    const [search, setSearch] = useSearchParams();
    useEffect(() => {
        const t = search.get('name');
        if (t === '' || t == null || t == undefined) {
            navigate('/myPal');
        }
        setTitle(t);
        setTimeout(() => {
            navigate('/myPal')
        }, 4000)
    })
    return (
        <div className={styles.container}>
            <div className={styles.successbox}>
                <div style={{
                    marginTop: '12rem'
                }}>
                    <img src={greenFireworks} style={{
                        width: '15rem',
                        height: '15rem'
                    }} />
                    <img src={successWoman} style={{
                        width: '15rem',
                        height: '15rem'
                    }} />
                    <div style={{
                        marginTop: '4rem',
                        fontSize: '2rem'
                    }}>
                        Hey ! Your new Pal {title} !
                    </div>
                </div>
            </div>


        </div>
    )
}
