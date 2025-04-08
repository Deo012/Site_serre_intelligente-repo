'use client'

import React, { useEffect } from "react";
import "./dashBoard.css"
import SlideBar from "../../components/slideBar/slideBar.jsx";
import CircularProgress from "../../components/circularProgress/circularProgress.jsx";
import SideBar from "../../components/sideBar/sideBar.jsx";
import ControlCards from "../../components/controlCards/controlCards";
import Image from "next/image";
import SerreInfo from "@/components/serreInfo/serreInfo";
import { DataProvider, useData } from "@/context/dataContext";
import DatabaseDataDiv from "../../components/databaseDataDiv/databaseDataDiv.jsx"

const DashBoard = ()=>{

    return(
        <>

        <div className="container-page">
            <div className="page">
                <SideBar/>

                <div className="haut-page">
                    <section className="haut-page-gauche">
                        <h1>Plantation</h1>

                        <section className="lumiere-info">

                            <div className="light-img-box">
                                <Image src="/assets/lamp.jpg" alt="image lamp" width={800} height={300}/>
                            </div>

                            <div className="light-detail">

                                <div>
                                    <p>Lumière pour plante</p>
                                </div>

                                <div>
                                    <SlideBar/>
                                </div>

                            </div>

                            <section className="temp-control">
                                <CircularProgress/>
                            </section>

                        </section>

                        <SerreInfo/>

                        <ControlCards/>

                    </section>

                    
                </div>
                
                <div>
                    <DatabaseDataDiv/>
                </div>

            </div>
        </div>

        </>
    );
}

export default DashBoard;