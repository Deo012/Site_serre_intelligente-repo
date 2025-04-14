"use client";

import React from "react";
import { useData } from "@/context/dataContext";
import "./databaseDataDiv.css";

const DatabaseDataDiv = () => {
    const { plantdata } = useData();

    return (
        <section className="database-data-div">
            <ul className="plant-info-list">
                <li><span className="label">🌱 Nom Plante</span> <span className="value">{plantdata.nom}</span></li>
                <li><span className="label">🌡️ Température Min</span> <span className="value">{plantdata.temp_min}°C</span></li>
                <li><span className="label">🌡️ Température Max</span> <span className="value">{plantdata.temp_max}°C</span></li>
                <li><span className="label">💧 Humidité Min</span> <span className="value">{plantdata.humidite_min}%</span></li>
                <li><span className="label">💧 Humidité Max</span> <span className="value">{plantdata.humidite_max}%</span></li>
            </ul>
        </section>
    );
};

export default DatabaseDataDiv;
