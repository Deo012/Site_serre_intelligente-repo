import React from "react";
import "./tete.css"
import {Link} from "react-router-dom"

const Tete = () => {
    return (
        <>
            <div>
            <div className="tete-container">
                <p className="tete-titre">Serre Intelligente</p>

                <nav>
                    <ul className="tete-center-ul">
                        <li><a href="/">Home</a></li>
                        <li><a href="/dashBoard">DashBoard</a></li>
                        <li><a href="/dropImagePage">AI</a></li>
                    </ul>
                </nav>

                <div><a href="/connexionPage">Connexion</a></div>
            </div>
            </div>
        </>
    );
}

export default Tete;