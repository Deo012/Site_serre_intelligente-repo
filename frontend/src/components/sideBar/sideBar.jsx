import React from "react";
import "./sideBar.css"
import Logo from "../../assets/react.svg"


const SideBar = () => {
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
                    <div className="menuItem">
                        <div>
                            Icon
                        </div>
                        <div>Dashboard</div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SideBar;