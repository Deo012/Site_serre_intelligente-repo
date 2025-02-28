import React, { useEffect } from "react";
import "./dropImagePage.css"
import "../assets/loupe.png"

const DropImagePage = () => {
    useEffect(() => {
        const script = document.createElement("script");

        script.src = "https://kit.fontawesome.com/f2385fabca.js";
        script.crossOrigin = "anonymous";
        script.async = true;

        document.body.appendChild(script);
        return () => {
            document.body.removeChild(script);
        };
    }, []);

    function dropHandler(){

    }

    return(
        <>
        <div className="page-drop-image-wrap">
            <h1 className="main-titre">
                Search
            </h1>

            <div className="containeur-global-drop-image">
                <form className="container-form" action="">
                    <label htmlFor="plant-name-input"><img src="../assets/loupe.png" alt="" /></label>
                    <input type="text" name="" id="plant-name-input" placeholder="Enter plant name"/>
                </form>

                <div className="ligne-millieu">
                    <span>OU</span>
                </div>

                <div className="glisser-area" onDrop={dropHandler}>
                    Faire glisser une image
                </div>
            </div>

        </div>
        </>
    );
}

export default DropImagePage;