import React, { useEffect } from "react";
import "./dashBoard.css"
import SlideBar from "../components/slideBar/slideBar.jsx";
import CircularProgress from "../components/circularProgress/circularProgress.jsx";
import Toggle from "../components/toggle/toggle.jsx";
import Cloud from "../components/cloud/cloud.jsx";
import { Link } from "react-router-dom";



const DashBoard = ()=>{

    return(
        <>

        <div className="page">
            
            <div className="haut-page">
                <section className="haut-page-gauche">
                    <h1>Tomate</h1>

                    <section className="lumiere-info">

                        <div className="light-img-box">
                            <img src="https://vicenza.lat/wp-content/uploads/2015/07/pf-3-2-1.jpg" alt="image lamp" width="800px"/>
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
                            <p className="info-titre">Humidité</p>
                            <p className="info">48,2%</p>
                        </div>

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

                    <section className="espace-de-control">
                        
                        <div className="control-container">
                            <div className="switch-section">
                                <Cloud/>
                                <Toggle/>
                            </div>
                            <div className="controler-info">
                                <p className="controler-mark">Gaabor</p>
                                <p className="controler-">Humidifier</p>
                            </div>
                        </div>

                        <div className="control-container">
                            <div className="switch-section">
                                <p>X</p>
                                <Toggle/>
                            </div>
                            <div className="controler-info">
                                <p className="controler-mark">Amazon echo</p>
                                <p className="controler-">Smart Lamp</p>
                            </div>
                        </div>

                        <div className="control-container">
                            <div className="switch-section">
                                <p>X</p>
                                <Toggle/>
                            </div>
                            <div className="controler-info">
                                <p className="controler-mark">Bando</p>
                                <p className="controler-">Ventilateurs</p>
                            </div>
                        </div>

                        <div className="control-container">
                            <div className="switch-section">
                                <p>X</p>
                                <Toggle/>
                            </div>
                            <div className="controler-info">
                                <p className="controler-mark">Bando</p>
                                <p className="controler-">Ventilateurs</p>
                            </div>
                        </div>

                    </section>

                </section>

                
            </div>
            

        </div>

        </>
    );
}

export default DashBoard;