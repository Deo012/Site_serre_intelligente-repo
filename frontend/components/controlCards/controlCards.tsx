/**
 * controlCards.js 
 * Composants générant les cartes pour le contrôle 
 * des appareils controllable ;a distance
 */

import React, { useEffect, useState } from "react";
import "./controlCards.css"
import Card from "../card/card";
import { useData } from "@/context/dataContext";
import axios from "axios";

let singleuse = false

const ControlCards = () => {
    const {remoteDevices, toggleSwitchState, plantdata, capteursData} = useData();
    
    // Structure contenant les différents état de chaque carte
    interface CardStatus {
        tempStat: "chaud" | "froid" | "neutre",
        humStat: "inonde" | "sec" | "neutre",
        humAirStat: "trop" | "peu" | "neutre"
    }

    // Servira a changer les couleurs dans le style
    const [status, setStatus] = useState<CardStatus>({
        tempStat: "neutre",
        humStat: "neutre",
        humAirStat: "neutre",
    });

    // fonction relancer a chaque changement des éléements récupéré dans useData
    useEffect(() => {
        if (!capteursData.length || !plantdata) return;

        // Logic pour allumer les fans si temp trop haut ou trop bas
        const temp_actuel = parseFloat(capteursData[0].value.replace("°C", ""));
        const temp_min = plantdata.temp_min;
        const temp_max = plantdata.temp_max;

        if (temp_actuel > temp_max) {

            setStatus(prev => ({ ...prev, tempStat: "chaud" }));
            axios.post("http://192.168.1.3.133:5000/fan_on")
            console.log("Ventillateur allume")
            singleuse = true
            // To-Do: ajouter logique pour éteindre les lumières chauffantes
        
        } else if (temp_actuel < temp_min) {

            setStatus(prev => ({ ...prev, tempStat: "froid" }));
            axios.post("http://192.168.1.3:5000/fan_off")
            console.log("Ventillateur eteint")
            // To-Do: ajouter logique pour allumer les lumières chauffantes

        } else {
            setStatus(prev => ({ ...prev, tempStat: "neutre" }));
            console.log("Ventillateur eteint")
            if ( singleuse == true){
                axios.post("http://192.168.1.3:5000/fan_off")
            }
            singleuse = false
            // axios.post("http://10.0.0.238:5000/fan_off")
        }
    }, [capteursData, plantdata, remoteDevices, toggleSwitchState]);

    return (
        <>
            <div className="control-cards">
                {remoteDevices.map((device, id) => {
                    
                    // Vérifie qu'elle carte est généré et applique l'état actuel pour un coloriage approprié
                    let deviceStatus = "neutre";
                    if (device.title.toLowerCase().includes("ventillateur")) {
                        deviceStatus = status.tempStat;
                    } else if (device.title.toLowerCase().includes("arrosage")) {
                        deviceStatus = status.humStat;
                    } else if (device.title.toLowerCase().includes("hum")) {
                        deviceStatus = status.humAirStat;
                    }

                    return(
                        <div className="parent-container" key={id}>
                            <Card
                            title= {device.title}
                            companyName = {device.companyName}
                            switch_state = {device.switch_state}
                            onToggle={() => toggleSwitchState(id)} //   active la fonction du contexte provider
                            stateStyle = {deviceStatus} // Pour le style
                            />
                        </div>
                    );
                })}
            </div>
        </>
    );
}

export default ControlCards;