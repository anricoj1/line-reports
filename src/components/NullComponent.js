// react
import React from 'react';

// components
import Navbar from './navbar/Navbar';

const NullComponent = ({ msg }) => {
    return (
        <div className="App">
            <div className="navbar navbar-expand-lg navbar-dark bg-success">
                <Navbar />
            </div>
            <div className="text-center">
                <h3>{msg} <span className="fa fa-circle-notch fa-spin"></span></h3>
                
            </div>
        </div>
    )
}

export default NullComponent;