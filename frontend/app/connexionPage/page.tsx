"use client"

import React, { useEffect, useState } from "react";
import "./connexionPage.css";
import { Link } from "react-router-dom";


const ConnexionPage = () => {

    let [name, setName] = useState("");
    let [password, setPassword] = useState("");
    let [age, setAge] = useState(0);
    let [id, setID] = useState(0);
    

    //Rechercher l'utilisateur et vérifier les infos quand le form html est soummis
    const handelSubmit = async(e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault(); //empeche le bouton de soummettre le formulaire
        
        
        const userData ={
            name,
            password
        }

        //loginAction(userData);

    }

    //Pour ajouter le script pour les icone fontawesome
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
    return (
        <>
            <div className="connexion-page-main">
                <div className="container-cp">
                    <h1>Connexion</h1>
                    <a href="/" className="close-signe"></a>
                    <form action="" method="POST">
                        <div className="input-box">
                            <input 
                                type="text" 
                                id="username" 
                                placeholder="Nom utilisateur"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <i className="fa-solid fa-user"></i>
                        </div>
                        <div className="input-box">
                            <input 
                                type="text" 
                                id="password" 
                                placeholder="Mots de passe"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <i className="fa-solid fa-lock"></i>
                        </div>
                        <button className="btn" type="submit" onClick={handelSubmit}>Conneter</button>
                        <div className="register-link">
                            <p>Pas de compte? <a href="#">Enregistrer</a></p>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default ConnexionPage;