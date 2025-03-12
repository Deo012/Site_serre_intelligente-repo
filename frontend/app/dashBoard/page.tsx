'use client'

import React, { useEffect } from "react";
import "./dashBoard.css"
import SlideBar from "../../components/slideBar/slideBar.jsx";
import CircularProgress from "../../components/circularProgress/circularProgress.jsx";
import Toggle from "../../components/toggle/toggle.jsx";
import Cloud from "../../components/cloud/cloud.jsx";
import { Link } from "react-router-dom";
import SideBar from "../../components/sideBar/sideBar.jsx";
import ControlCards from "../../components/controlCards/controlCards.jsx";
import Image from "next/image";


const DashBoard = ()=>{

    return(
        <>

        <div className="container-page">
            <div className="page">
                <SideBar/>

                <div className="haut-page">
                    <section className="haut-page-gauche">
                        <h1>Tomate</h1>

                        <section className="lumiere-info">

                            <div className="light-img-box">
                                <Image src="/assets/lamp.jpg" alt="image lamp" width={800} height={300}/>
                            </div>

                            <div className="light-detail">

                                <div>
                                    <p>Device</p>
                                    <p>Lumière LED Moderne Standing Lamp</p>
                                </div>

                                <div>
                                    <SlideBar/>
                                </div>

                            </div>

                            <section className="temp-control">
                                <CircularProgress></CircularProgress>
                            </section>

                        </section>

                        <section className="serre-infos">

                            <div className="info-container">
                                <p className="info-titre">Temperature</p>
                                <p className="info">68°C</p>
                            </div>

                            <div className="info-container">
                                <p className="info-titre">CO2</p>
                                <p className="info">20%</p>
                            </div>

                            <div className="info-container">
                                <p className="info-titre">Humidité sol</p>
                                <p className="info">70%</p>
                            </div>

                        </section>

                        <ControlCards/>

                    </section>

                    
                </div>
                
                <div></div>

            </div>
        </div>

        </>
    );
}

export default DashBoard;