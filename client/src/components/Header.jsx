import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import M from 'materialize-css';
import authReducer from "../reducers/authReducer";
import Payments from "./Payments";

function mapStateToProps(state) {

    // uncomment to see the auth fetch process 
    // {null -> false} or {null -> user}
    // console.log(state);

    return { auth: state.auth };
}

function Header(props) {

    // uncomment to see the auth fetch process 
    // {null -> false} or {null -> user}
    // console.log(props);

    useEffect(() => {
        // Initialize sidenav when the component mounts
        var elems = document.querySelectorAll('.sidenav');
        var instances = M.Sidenav.init(elems);
    });     // NOTE :: Having the [] at the end makes the sidebar initialize only once we dont want it like that since its content changes

    function renderContent() {
        switch (props.auth) {
            case null:
                return (
                    <ul className="right hide-on-med-and-down">
                        Loading ...
                    </ul>
                );

            case false:
                return (
                    <ul className="right hide-on-med-and-down">
                        <li><a href="/auth/google">Login With Google</a></li>
                    </ul>
                );

            default:
                return (
                    <ul className="right hide-on-med-and-down">
                        <li key="1"><Payments /></li>
                        <li key="2" style={{ margin: '0 10px' }}>Credits : {props.auth.credits}</li>
                        <li key="3"><a href="/api/logout">Logout</a></li>
                    </ul>
                );
        }
    }

    function renderSideBarContent() {
        switch (props.auth) {
            case null:
                return (
                    <ul className="sidenav" id="mobileView">
                        <h5 className="myGradientText">BroadMailer</h5>
                        <hr />
                        <li>Loading ...</li>
                    </ul>
                );

            case false:
                return (
                    <ul className="sidenav" id="mobileView">
                        <h5 className="myGradientText">BroadMailer</h5>
                        <hr />
                        <li><a href="/auth/google">Login With Google</a></li>
                    </ul>
                );

            default:
                return (
                    <ul className="sidenav" id="mobileView">
                        <h5 className="myGradientText">BroadMailer</h5>
                        <hr />
                        <li key="2" style={{ margin: '0 10px' }}>Credits : {props.auth.credits}</li>
                        <li key="1"><Payments /></li>
                        <li key="3"><a href="/api/logout">Logout</a></li>
                    </ul>
                );
        }
    }

    return (
        <nav className="blue">
            <div className="nav-wrapper">
                <Link
                    to={props.auth ? "/surveys" : "/"}
                    className="brand-logo"
                    style={{ marginLeft: '20px', fontWeight: 'bolder' }}

                >
                    BroadMailer
                </Link>
                <a href="#" data-target="mobileView" className="sidenav-trigger"><i class="material-icons">menu</i></a>
                {/*                     
                    <ul className="right">
                        <li>
                            <a href="/auth/google">Login With Google</a>
                        </li> 
                    </ul>
                */}
                {renderContent()}
                {renderSideBarContent()}
            </div>
        </nav>
    );
}

export default connect(mapStateToProps)(Header);