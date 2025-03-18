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