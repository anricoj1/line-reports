// react
import React from 'react';


const Navbar = () => {
    return (
        <div className="container">
            <a className="navbar-brand">Line Reports</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapse">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="collapse">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <a className="nav-link">NOR</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link">DAN</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link">YON</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link">FARM</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link">NWG</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link">EM</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link">PRM</a>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Navbar;