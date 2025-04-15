"use client"

import React, { useEffect, useState } from "react";
import "./connexionPage.css";
import Link from "next/link";
import { useRouter } from "next/navigation";



const ConnexionPage = () => {
    const router = useRouter()

    //Rechercher l'utilisateur et vérifier les infos quand le form html est soummis
    async function handelSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault(); //empeche le bouton de soummettre le formulaire
        
        const formData = new FormData(e.currentTarget);
        const username = formData.get("username");
        const password = formData.get("password");

        const reponse = await fetch("/api/auth/login",{
            method: "POST",
            headers: {"Content-Type": "application/json"},
            credentials: "include",
            body: JSON.stringify({username, password}),
        });

        if(reponse.ok){
            router.push("/dashBoard");
        }
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
                    <Link href="/" className="close-signe"></Link>

                    <form onSubmit={handelSubmit}>
                        <div className="input-box">
                            <input 
                                type="text" 
                                name="username" 
                                placeholder="Nom utilisateur"
                            />
                            <i className="fa-solid fa-user"></i>
                        </div>
                        <div className="input-box">
                            <input 
                                type="text" 
                                name="password" 
                                placeholder="Mots de passe"
                            />
                            <i className="fa-solid fa-lock"></i>
                        </div>
                        <button className="btn" type="submit">Conneter</button>
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