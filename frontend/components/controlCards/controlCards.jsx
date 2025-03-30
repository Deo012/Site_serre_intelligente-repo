import React, { useState } from "react";
import "./controlCards.css"
import Card from "../card/card";
import { capteursData } from "../../Data";
import { useData } from "@/context/dataContext";

const ControlCards = () => {
    const {remoteDevices, toggleSwitchState} = useData();

    return (
        <>
            <div className="control-cards">
                {remoteDevices.map((device, id) => {
                    return(
                        <div className="parent-container" key={id}>
                            <Card
                            title= {device.title}
                            companyName = {device.companyName}
                            switch_state = {device.switch_state}
                            onToggle={() => toggleSwitchState(id)} //   active la fonction du contexte provider
                            />
                        </div>
                    );
                })}
            </div>
        </>
    );
}

export default ControlCards;