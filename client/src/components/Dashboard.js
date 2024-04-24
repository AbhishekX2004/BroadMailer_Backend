import React, { useEffect } from "react";
import { Link } from 'react-router-dom';
import M from 'materialize-css';

function Dashboard(props) {
    useEffect(() => {
        // Initialize tooltips when the component is mounted
        var elems = document.querySelectorAll('.tooltipped');
        var instances = M.Tooltip.init(elems);
    }, []); // Empty dependency array ensures that this effect runs only once after the component is mounted

    return (
        <div>
            Dashboard
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

export default Dashboard;
