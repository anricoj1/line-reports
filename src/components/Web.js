// react
import React from 'react';

// components
import Navbar from './navbar/Navbar';

// css
import './App.css';


const Web = ({ windowSize, orders, view, setView }) => {
    return (
        <div className="Web">
            <div className="navbar navbar-expand-lg navbar-dark bg-primary">
                <Navbar windowSize={windowSize} />
            </div>
            <div className="container">
                {orders.length < 1 ? null : view}
            </div>
        </div>
    )
}

export default Web;