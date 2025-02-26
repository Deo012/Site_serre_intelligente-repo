import React from "react";
import "./tete.css"

const Tail = () => {
    return (
        <>
        <div className="bas-page">
            <div>
                <p>Serre Intelligente</p>
            </div>

            <div className="liens">
                <Link to="/connexionPage">Page de connexion</Link>
                <Link>Page Principal</Link>
                <Link>Ai help</Link>
            </div>

            <div>
                <div>
                    ImgP
                </div>

                <div>
                    Nom et Prenom
                </div>
            </div>

        </div>
        
        </>
    );
}

export default Tail;