import React, { useEffect } from "react";
import "./dropImagePage.css"

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

    return(
        <>
        <div className="page-drop-image-wrap">
            <h1 className="main-titre">
                Search
            </h1>

            <div className="containeur-global-drop-image">
                <form action="">
                    <label htmlFor="plant-name-input"><i class="fa-solid fa-magnifying-glass"></i></label>
                    <input type="text" name="" id="plant-name-input" />
                </form>

                <div>
                    Line du millieu
                </div>

                <div>
                    Faire glisser une image
                </div>
            </div>

        </div>
        </>
    );
}

export default DropImagePage;