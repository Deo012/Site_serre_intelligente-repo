import "./acceuilPage.css";
import Tete from "../components/tete/tete";
import { Link } from "react-router-dom";
import planteImage from "../assets/tanaman 5-01.svg"

const AcceuilPage = () => {
    return(
        <>
            <div className="acceuil-container">
                <Tete/>

                <div className="acceuil-content">
                    <a href="/dropImagePage" className="accueil-btn">Connexion Page</a>
                    <h1>Prend soin de la nature <br/>sans difficulté</h1>
                    <p>Un systeme de gestion de broussaille simple et éfficace</p>
                    
                </div>

                <img src={planteImage} alt="" />

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