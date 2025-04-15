import React, { useState } from "react";
import "./sideBar.css"
import Link from "next/link"
import Image from "next/image";
import { useLocation } from "react-router-dom";
import { usePathname } from "next/navigation";


const SideBar = () => {
    const pathname = usePathname();

    const handleLogout = async () => {
        const response = await fetch("/api/auth/logout", {
            method: "POST",
        });
    
        if (response.ok) {
            // Redirige vers la page de connexion par exemple
            window.location.href = "/connexionPage";
        }
    };

    return(
        <>
            <div className="sideBar">
                {/*Logo */}
                <div className="logo">
                    <Image src="/react.svg" alt="logo" width={400} height={400} />
                    <span>
                        S<span>e</span>rre
                    </span>
                </div>
                {/* menu */}
                <div className="menu">
                    <Link 
                        className={pathname === "/dashBoard" ? "menuItem active" : "menuItem"}
                        href="/dashBoard"
                    >
                        <div>
                            🏚️
                        </div>
                        <div>Tableau de bord</div>
                    </Link>
                    <Link 
                        className={pathname === "/dropImagePage" ? "menuItem active" : "menuItem"}
                        href="/dropImagePage"
                    >
                        <div>
                            📁
                        </div>
                        <div>Deposer Image</div>
                    </Link>

                         <button className="menuItem" onClick={handleLogout}>
                            <div>❌</div>
                            <div>Déconnexion</div>
                        </button>
            
                    <Link 
                        className={pathname === "/" ? "menuItem active" : "menuItem"}
                        href="/"
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