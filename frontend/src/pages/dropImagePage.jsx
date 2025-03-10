import React, { useEffect, useState } from "react";
import "./dropImagePage.css"
import loupeImg from "../assets/loupe.png"
import SideBar from "../components/sideBar/sideBar";

const DropImagePage = () => {

    const [files, setFiles] = useState([]);

    const handleDrop = (event) => {
        event.preventDefault();
        event.stopPropagation();

        const droppedFiles = Array.from(event.dataTransfer.files);
        setFiles((prevFiles) => [...prevFiles, ...droppedFiles]);
    };

    const handleDragOver = (event) => {
        event.preventDefault(); // Needed to allow dropping
    };

    return(
        <>
        <div className="container-page">

            <div className="dropImagePage">
                <SideBar/>
                <div className="drop-wrap">
                    <h1 className="main-titre">
                        Search
                    </h1>

                    <div className="containeur-global-drop-image">
                        <form className="container-form" action="">
                            <label htmlFor="plant-name-input"><img src={loupeImg} alt="" width="30px"/></label>
                            <input type="text" name="" id="plant-name-input" placeholder="Enter plant name"/>
                        </form>

                        <div className="ligne-millieu">
                            <span>OU</span>
                        </div>

                        <div id="glisser-area" onDrop={handleDrop} onDragOver={handleDragOver}>
                            Faire glisser une image
                        </div>

                        {files.length > 0 && (
                            <div className="file-list">
                                <h3>Selected Files:</h3>
                                <ul>
                                    {files.map((file, index) => (
                                        <li key={index}>{file.name}</li>
                                    ))}
                                </ul>
                            </div>
                        )}

                    </div>

                </div>
            </div>
            
        </div>
        </>
    );
}

export default DropImagePage;