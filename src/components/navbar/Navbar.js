// react
import React from 'react';

// css
import './Navbar.css';


const Navbar = ({ setNavSelection, setAppState }) => {
    const navlist = ['All Stores', 'Norwalk', 'Danbury', 'Yonkers', 'Farmingdale', 'Newington', 'East Meadow', 'Paramus'];

    return (
        <div className="container">
            <a className="navbar-brand">Line Reports</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapse">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="collapse">
                <ul className="navbar-nav mr-auto">
                    {navlist.map((item, i) => (
                        <li className="nav-item" key={i}>
                            <a className="nav-link" onClick={() => { setNavSelection(item); setAppState(item)}}>{item}</a>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default Navbar;