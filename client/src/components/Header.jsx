import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import authReducer from "../reducers/authReducer";
import Payments from "./Payments";

function mapstateToProps(state){
    
    // uncomment to see the auth fetch process 
    // {null -> false} or {null -> user}
    // console.log(state);
    
    return { auth: state.auth };
}

function Header(props) {

    // uncomment to see the auth fetch process 
    // {null -> false} or {null -> user}
    // console.log(props);

    function renderContent() {
        switch (props.auth) {
            case null:
                return (
                    <ul className="right">
                        Searching ... 
                    </ul>
                );

            case false:
                return (
                    <ul className="right">
                        <li><a href="/auth/google">Login With Google</a></li>
                    </ul>
                );

            default:
                return (
                    <ul className="right">
                        <li key="1"><Payments /></li>
                        <li key="2"><a href="/api/logout">Logout</a></li>
                    </ul>
                );
        }
    }

    return (
        <nav style={{backgroundColor: "skyblue"}}>
            <div className="nav-wrapper">
                <Link 
                    to= { props.auth ? "/surveys" : "/" } 
                    className="left brand-logo"
                >
                    BroadMailer
                </Link>
                    {/*                     
                    <ul className="right">
                        <li>
                            <a href="/auth/google">Login With Google</a>
                        </li> 
                    </ul>
                    */}
                    {
                        renderContent()
                    }
            </div>
        </nav>
    );
}

export default connect(mapstateToProps)(Header);