import React from "react";
import "./tete.css"
import Link from "next/link";

const Tete = () => {
    return (
        <>
            <div>
            <div className="tete-container">
                <p className="tete-titre">Serre Intelligente</p>

                <nav>
                    <ul className="tete-center-ul">
                        <li><Link href="/">Home</Link></li>
                        <li><Link href="/dashBoard">DashBoard</Link></li>
                        <li><Link href="/dropImagePage">AI</Link></li>
                    </ul>
                </nav>

                <div><a href="/connexionPage">Connexion</a></div>
            </div>
            </div>
        </>
    );
}

export default Tete;