"use client";

import React, { useState } from "react";
import "./dropImagePage.css";
import SideBar from "@/components/sideBar/sideBar";
import Image from "next/image";
import { getPanteInfo } from "../api/getPlanteInfo/route";

const DropImagePage = () => {
    const [file, setFile] = useState<File | null>(null); // Allow only one file
    const [plantName, setPlantName] = useState<string>("");

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.stopPropagation();
        
        const droppedFile = event.dataTransfer.files[0]; // Only take the first file
        if (droppedFile) {
            setFile(droppedFile);
        }
    };

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault(); // Allow drop
    };

    const handleSubmit = async (event: any) => {
        event.preventDefault()
        event.stopPropagation()

        const formData = new FormData();
        if (plantName) {
            formData.append("plantName", plantName); // Send plant name if available
        } else if (file) {
            formData.append("image", file); // Send image if no plant name
        } else {
            alert("Please enter a plant name or upload an image.");
            return;
        }
        
        const result = await getPanteInfo(formData);
        console.log("Plante info found: ", result)
    };


    return (
        <div className="container-page">
            <div className="dropImagePage">
                <SideBar />
                <div className="drop-wrap">
                    <h1 className="main-titre">Search</h1>

                    <div className="containeur-global-drop-image">
                        <form className="container-form" onSubmit={handleSubmit}>
                            <label htmlFor="plant-name-input">
                                <Image src="/assets/loupe.png" alt="Search Icon" width={30} height={30} />
                            </label>
                            <input 
                                type="text" 
                                id="plant-name-input" 
                                name="plante_name"
                                placeholder="Enter plant name"
                                onChange={event => setPlantName(event.target.value)} />
                            <button type="submit"> Send </button>
                        </form>

                        <div className="ligne-millieu">
                            <span>OU</span>
                        </div>

                        <div id="glisser-area" onDrop={handleDrop} onDragOver={handleDragOver}>
                            Faire glisser une image
                        </div>

                        {file && (
                            <div className="file-list">
                                <h3>Selected File:</h3>
                                <p>{file.name}</p>
                                <button onClick={() => setFile(null)}>Remove</button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DropImagePage;
