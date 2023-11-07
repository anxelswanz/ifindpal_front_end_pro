import { Carousel } from 'antd'
import React, { useEffect, useState } from 'react'
import Art from '../../assets/img/art.png'
import Brand from '../../assets/brand/logo.png'
import { getRecommended } from '../../api/Api'
import p1 from '../../assets/carousel/p1.png'
import p2 from '../../assets/carousel/p2.png'
import p3 from '../../assets/carousel/p3.png'
import p4 from '../../assets/carousel/p4.png'
import axios from 'axios'
export default function DisplayPic() {

    return (
        <div >
            <Carousel autoplay style={{
                backgroundColor: '#DCCDF3'
            }}>

                <div style={{
                    width: '100%',
                    height: '100%'
                }}>
                    <img
                        style={{
                            width: '100%',
                            height: '28rem',
                            borderRadius: '6px',
                            display: 'inline !important',
                            border: '4px solid #6B2ECB',
                            boxShadow: '10px 5px 5px #6B2ECB'
                        }}
                        src={p1} />
                </div>

                <div>
                    <img
                        style={{
                            width: '40rem',
                            height: '28rem',
                            marginLeft: '16%',
                            borderRadius: '6px',
                            display: 'inline !important',
                            border: '4px solid #6B2ECB'
                        }}
                        src={p2} />
                </div>
                <div>
                    <img
                        style={{
                            width: '40rem',
                            height: '28rem',
                            marginLeft: '16%',
                            borderRadius: '6px',
                            display: 'inline !important',
                            border: '4px solid #6B2ECB',
                            boxShadow: '10px 5px 5px #6B2ECB'
                        }}
                        src={p3} />
                </div>
                <div>
                    <img
                        style={{
                            width: '40rem',
                            height: '28rem',
                            marginLeft: '16%',
                            borderRadius: '6px',
                            display: 'inline !important',
                            border: '4px solid #6B2ECB',
                            boxShadow: '10px 5px 5px #6B2ECB'
                        }}
                        src={p4} />
                </div>
            </Carousel>
        </div>
    )
}
