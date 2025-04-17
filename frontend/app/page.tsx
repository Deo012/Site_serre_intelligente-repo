"use client"

/**
 * Page d'acceul
 */

import "./acceuilPage.css";
import Tete from "../components/tete/tete";
import { Link } from "react-router-dom";
import planteImage from "/assets/tanaman 5-01.svg"
import Image from "next/image";

const AcceuilPage = () => {
    return(
        <>
            <div className="acceuil-container">
                <Tete/>

                <div className="acceuil-content">
                    <a href="/connexionPage" className="accueil-btn">Page de connexion</a>
                    <h1>Prend soin de la nature <br/>sans difficulté</h1>
                    <p>Un systeme de gestion de broussaille simple et éfficace</p>
                    
                </div>

                <Image src="/assets/tanaman 5-01.svg" alt="" width={800} height={500}/>

                <div className="social-link">
                    <a href="">FACEBOOK</a>
                    <a href="">INSTAGRAM</a>
                    <a href="">GITHUB</a>
                </div>
            </div>
        </>
    );
}

export default AcceuilPage;