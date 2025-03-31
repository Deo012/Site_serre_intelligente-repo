"use client";

import React from "react";
import { useData } from "@/context/dataContext";
import "./databaseDataDiv.css"

const DatabaseDataDiv = () => {
    const {planteHealthInfos} = useData()

    return(
        <section className="database-data-div">
            <ul>
                <li>Nom Plante: {planteHealthInfos.nom}</li>
                <li>Temperature min: {planteHealthInfos.temp_min}</li>
                <li>Temperature max: {planteHealthInfos.temp_max}</li>
                <li>Humidité max: {planteHealthInfos.humidite_max}</li>
                <li>Humidité min: {planteHealthInfos.humidite_min}</li>
            </ul>
        </section>
    );
}

export default DatabaseDataDiv;