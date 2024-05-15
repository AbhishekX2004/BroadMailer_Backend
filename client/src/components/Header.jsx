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
        // Initialize tooltips when the component is mounted
        var elems = document.querySelectorAll('.tooltipped');
        M.Tooltip.init(elems);
    }, []); // Empty dependency array ensures that this effect runs only once after the component is mounted
    
    useEffect(() => {
        // Initialize sidenav when the component mounts
        var elems = document.querySelectorAll('.sidenav');
        M.Sidenav.init(elems, {});
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
                        {/* <li key="1"><Payments /></li> */}
                        <li key="1" style={{ margin: '0 10px' }}><b>Credits:</b> {props.auth.credits}</li>
                        <li key="2"><a href="/api/logout">Logout</a></li>
                    </ul>
                );
        }
    }

    function sideBarFooter(){
        return (
            <div style={{ alignSelf: 'flex-end', marginTop: 'auto' }}>
                <hr />
                <p className="white-text center">
                    By - <b>Abhishek Verma</b>
                </p>
                <ul style={{ display: 'flex' }}>
                    <li>
                        <a style={{ margin: '0 5px 0 5px' }} className="grey-text text-lighten-4" href="https://www.linkedin.com/in/abhishek-verma-05177625b/">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-linkedin" viewBox="0 0 16 16">
                                <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z" />
                            </svg>
                        </a>
                    </li>
                    <li>
                        <a style={{ margin: '0 5px 0 5px' }} className="grey-text text-lighten-4" href="https://github.com/AbhishekX2004">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-github" viewBox="0 0 16 16">
                                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8" />
                            </svg>
                        </a>
                    </li>
                </ul>
            </div>
        )
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
                        {sideBarFooter()}
                    </ul>
                );

            default:
                return (
                    <ul className="sidenav" id="mobileView" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%', paddingBottom: '0' }}>
                        <div>
                            <h5 className="myGradientText"><Link to={props.auth ? "/surveys" : "/"}>BroadMailer</Link></h5>
                            <hr />
                            <li key="1" style={{ margin: '0 10px' }}><b>Credits:</b> {props.auth.credits}</li>
                            <li key="2"><Link to="/">Home</Link></li>
                            <li key="3"><Link to="/surveys">Dashboard</Link></li>
                            <li key="4"><a href="/api/logout">Logout</a></li>
                        </div>
                        {sideBarFooter()}
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
                <a href="#" data-target="mobileView" className="sidenav-trigger"><i className="material-icons">menu</i></a>
                {/*                     
                    <ul className="right">
                        <li>
                            <a href="/auth/google">Login With Google</a>
                        </li> 
                    </ul>
                */}
                {renderContent()}
                {renderSideBarContent()}

                {/* initialize the payment component */}
                <Payments />

                {/* new payment button */}
                <button
                    data-target="payment-modal"
                    className="tooltipped modal-trigger btn-floating btn-large halfway-fab waves-effect waves-light teal"
                    data-position="bottom"
                    data-tooltip="Add Credits"
                    style={{ width: '45px', height: '45px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                >
                    <i className="material-icons" style={{ fontSize: "25px", paddingTop: '2px' }}>payment</i>
                </button>


            </div>
        </nav>
    );
}

export default connect(mapStateToProps)(Header);