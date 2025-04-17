/**
 * resumeCard.jsx
 * Composant affiche les données des capteurs (temp, hum, co2)
 */

const ResumeCard = ( props ) => {
    return(
        <>
            <div className="info-container">
                <p className="info-titre">{props.title}</p>
                <p className="info">{props.value}</p>
            </div>
        </>
    ); 
}

export default ResumeCard;