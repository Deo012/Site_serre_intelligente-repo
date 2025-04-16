"use client"

import React, { useEffect, useState } from "react";
import "./dropImagePage.css"
import SideBar from "@/components/sideBar/sideBar";
import Image from "next/image";
import { useData } from "@/context/dataContext";

const DropImagePage = () => {

    // Explicitly define the state type as File[]
    const [files, setFiles] = useState<File | null>(null);
    const [result, setResult] = useState<string>("");
    const [enterPlant, setEnterPlant] = useState<string>("");
    const {plantdata} = useData()


    const handleDrop = (s: React.ChangeEvent<HTMLInputElement>) => {

        if (s.target.files && s.target.files.length > 0) {
            setFiles(s.target.files[0]);
        }
    };

    const handleUpload = async () => {

        const formData = new FormData();
        if (files) formData.append("imageFile", files);
        if (enterPlant) formData.append("plantName", enterPlant);

        const res = await fetch("/api/getPlanteInfo", {
            method: "POST",
            body: formData,
        });

        const data = await res.json();
        console.log("API Response:", data);
        setResult(data.plant?.common_name || "Not found");

        plantdata.humidite_max =  data.plant ? data.plant.max_humidity : 999,
        plantdata.humidite_min = data.plant ? data.plant.min_humidity : 999,
        plantdata.id = data.plant ? data.plant.id : 999,
        plantdata.nom = data.plant ? data.plant.common_name : "Not found",
        plantdata.temp_max= data.plant ? data.plant.max_temperature : 999,
        plantdata.temp_min= data.plant ? data.plant.min_temperature : 999

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
                            <input type="text" name="" id="plant-name-input" placeholder="Enter plant name" onChange={(s)=> setEnterPlant(s.target.value)}/>
                        </form>

                        <div className="ligne-millieu">
                            <span>OU</span>
                        </div>

                        <div id="glisser-area">
                            <input type="file" accept="image/" onChange={handleDrop}/>
                        </div>
                        <button  onClick={handleUpload}>Envoyer</button>

                        {result && <h2>Plant Identifé: {result}</h2>}

                    </div>

                </div>
            </div>
            
        </div>
        </>
    );
}

export default DropImagePage;