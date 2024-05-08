import React, { useEffect } from "react";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import M from 'materialize-css';
import SurveyList from "./surveys/SurveyList";


function mapStateToProps(state){
    
    // uncomment to see the auth fetch process 
    // {null -> false} or {null -> user}
    // console.log(state);
    
    return { auth: state.auth };
}

function Dashboard(props) {
    useEffect(() => {
        // Initialize tooltips when the component is mounted
        var elems = document.querySelectorAll('.tooltipped');
        var instances = M.Tooltip.init(elems);
    }, []); // Empty dependency array ensures that this effect runs only once after the component is mounted

    function greeting() {
        const currentTime = new Date();
        const currentHour = currentTime.getHours();
    
        if (currentHour < 12) {
            return "Good Morning";
        } else if (currentHour < 18) {
            return "Good Afternoon";
        } else {
            return "Good Evening";
        }
    }

    if(!props.auth){
        return(
            <h4 className="center customColor1">Please log in to view this page.</h4>
        )
    }
    return (
        <div>
            <h4 className="customColor2">{greeting()} <span className="myGradientText">{props.auth.name}</span> !!</h4>
            
            <SurveyList />

            <div className="fixed-action-btn">
                <Link 
                    className="btn-floating btn-large waves-effect waves-light teal tooltipped"
                    data-position="top" 
                    data-tooltip="Send a new Survey"
                    to="/surveys/new"
                    style={{ width: '65px', height: '65px' }}
                >
                    <i className="material-icons" style={{ fontSize: '45px', paddingTop: '4px' }}>
                        add
                    </i>
                </Link>
            </div>
        </div>
    );
}

export default connect(mapStateToProps)(Dashboard);
