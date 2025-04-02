"use client";

import React, { useEffect, useState } from "react";
import { useData } from "@/context/dataContext";
import "./databaseDataDiv.css"

const DatabaseDataDiv = () => {
    //const {planteHealthInfos: plantdata} = useData()
    const [plantdata , setPlantData] = useState("")

    useEffect(() => {


        // fetch("http://127.0.0.1:5000/predict", {
        //     method: "POST",
        //     body: new FormData(),
        // })
        // const data = response.json();
        // setResult(data.plant_info);

        

    })

    return(
        <section className="database-data-div">
            <ul>
                <li>Nom Plante: {plantdata.common_name}</li>
                <li>Temperature min: {plantdata.min_temperature}</li>
                <li>Temperature max: {plantdata.max_temperature}</li>
                <li>Humidité max: {plantdata.min_humidity}</li>
                <li>Humidité min: {plantdata.max_humidity}</li>
            </ul>
        </section>
    );
}

export default DatabaseDataDiv;