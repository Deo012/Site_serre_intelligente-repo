"use client"

import React, { useEffect, useState } from "react";
import "./dropImagePage.css"
//import loupeImg from "/assets/loupe.png"
import SideBar from "@/components/sideBar/sideBar";
import Image from "next/image";
import axios from "axios";
import { useData } from "@/context/dataContext";

const DropImagePage = () => {

    // Explicitly define the state type as File[]
    const [files, setFiles] = useState<File | null>(null);
    const [result, setResult] = useState<string>("")
    const {plantdata} = useData()


    const handleDrop = (s: React.ChangeEvent<HTMLInputElement>) => {

        if (s.target.files && s.target.files.length > 0) {
            setFiles(s.target.files[0]);
        }
    };

    const handleUpload = async () => {
        if (!files) return;

        const formData = new FormData();
        formData.append("file", files);

        const response = await fetch("http://127.0.0.1:5000/predict", {
            method: "POST",
            body: formData
        });

        const data = await response.json();
        setResult(data.plant_name);
        // formData.set('plantName',data.plant_name)

        console.log(data.plant_info)

        plantdata.humidite_max =  data.plant_info.max_humidity,
        plantdata.humidite_min= data.plant_info.min_humidity,
        plantdata.id = 0,
        plantdata.nom= data.plant_info.common_name,
        plantdata.nom_scientifique= "",
        plantdata.temp_max= data.plant_info.max_temperature,
        plantdata.temp_min= data.plant_info.min_temperature

    };

    return(
        <>
        <div className="container-page">

            <div className="dropImagePage">
                <SideBar/>
                <div className="drop-wrap">
                    <h1 className="main-titre">
                        Recherche
                    </h1>

                    <div className="containeur-global-drop-image">
                        <form className="container-form" action="">
                            <label htmlFor="plant-name-input"><Image src="/assets/loupe.png" alt="" width={30} height={30}/></label>
                            <input type="text" name="" id="plant-name-input" placeholder="Enter plant name"/>
                        </form>

                        <div className="ligne-millieu">
                            <span>OU</span>
                        </div>

                        <div id="glisser-area">
                            <input type="file" accept="image/" onChange={handleDrop}/>
                        </div>
                        <button  onClick={handleUpload}>Send</button>

                        {result && <h2>Plant Identified: {result}</h2>}

                        {/* {files.length > 0 && (
                            <div className="file-list">
                                <h3>Selected Files:</h3>
                                <ul>
                                    {files.map((file, index) => (
                                        <li key={index}>{file.name}</li>
                                    ))}
                                </ul>
                            </div>
                        )} */}

                    </div>

                </div>
            </div>
            
        </div>
        </>
    );
}

export default DropImagePage;