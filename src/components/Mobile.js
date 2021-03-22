// react
import React from 'react';

// components
import Navbar from './navbar/Navbar';

// css
import './App.css';


const Mobile = ({ windowSize, orders, view, setView }) => {
    return (
        <div className="Mobile">
            <div className="navbar navbar-expand-lg navbar-default">
                <Navbar windowSize={windowSize} />
            </div>
            <div className="container">
                {orders.length < 1 ? null : view}
            </div>
        </div>
    )
}

export default Mobile;