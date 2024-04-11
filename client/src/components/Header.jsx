import React from "react";

function Header() {
    return (
        <nav style={{backgroundColor: "skyblue"}}>
            <div className="nav-wrapper">
                <a href= "/" className="left brand-logo">
                    BroadMailer
                </a>
                <ul className="right">
                    <li>
                        <a href="/auth/google">Login With Google</a>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Header;