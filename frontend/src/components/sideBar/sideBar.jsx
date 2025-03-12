import React, { useState } from "react";
import "./sideBar.css"
import Logo from "../../assets/react.svg"
import { Link, useLocation } from "react-router-dom";


const SideBar = () => {
    const location = useLocation();
    return(
        <>
            <div className="sideBar">
                {/*Logo */}
                <div className="logo">
                    <img src={Logo} alt="" />
                    <span>
                        S<span>e</span>rre
                    </span>
                </div>
                {/* menu */}
                <div className="menu">
                    <Link 
                        className={location.pathname === "/dashBoard" ? "menuItem active" : "menuItem"}
                        to="/dashBoard"
                    >
                        <div>
                            🏚️
                        </div>
                        <div>Dashboard</div>
                    </Link>
                    <Link 
                        className={location.pathname === "/dropImagePage" ? "menuItem active" : "menuItem"}
                        to="/dropImagePage"
                    >
                        <div>
                            📁
                        </div>
                        <div>Drop page</div>
                    </Link>
                    <Link 
                        className={location.pathname === "/" ? "menuItem active" : "menuItem"}
                        to="/"
                    >
                        <div>
                            ❌
                        </div>
                        <div>Deconnxion</div>
                    </Link>
                    <Link 
                        className={location.pathname === "/" ? "menuItem active" : "menuItem"}
                        to="/"
                    >
                        <div>
                            🔙
                        </div>
                        <div>Retour</div>
                    </Link>
                </div>
            </div>
        </>
    );
}

export default SideBar;