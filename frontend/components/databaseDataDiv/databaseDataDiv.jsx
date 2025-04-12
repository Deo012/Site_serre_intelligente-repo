"use client";

import React, { useEffect, useState } from "react";
import { useData } from "@/context/dataContext";
import "./databaseDataDiv.css"

const DatabaseDataDiv = () => {
    //const {planteHealthInfos} = useData()
    const {plantdata} = useData()

    // useEffect(() => {


    //     // fetch("http://127.0.0.1:5000/predict", {
    //     //     method: "POST",
    //     //     body: new FormData(),
    //     // })
    //     // const data = response.json();
    //     // setResult(data.plant_info);

        

    // })

    return(
        <section className="database-data-div">
            <ul>
                <li>Nom Plante: {plantdata.nom}</li>
                <li>Temperature min: {plantdata.temp_min}</li>
                <li>Temperature max: {plantdata.temp_max}</li>
                <li>Humidité max: {plantdata.humidite_max}</li>
                <li>Humidité min: {plantdata.humidite_min}</li>
            </ul>
        </section>
    );
}

export default DatabaseDataDiv;