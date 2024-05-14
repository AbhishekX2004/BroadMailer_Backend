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
                        <h5 className="myGradientText"><Link to={props.auth ? "/surveys" : "/"}>BroadMailer</Link></h5>
                        <hr />
                        <li key="1" style={{ margin: '0 10px' }}><b>Credits:</b> {props.auth.credits}</li>
                        {/* <li key="2"><Payments /></li> */}

                        <li key="2"><Link to="/">Home</Link></li>
                        <li key="3"><Link to="/surveys">Dashboard</Link></li>
                        <li key="4"><a href="/api/logout">Logout</a></li>
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