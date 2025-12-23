import React from 'react';
import { Link } from 'react-router-dom';
import './App.css';

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <Link to="/Home" className="nav-link">DatabaseProject</Link>
            </div>
            <ul className="nav-links">
                <li>
                    <Link to="/Home" className="nav-link">Home</Link>
                </li>
                <li>
                    <Link to="/DataEntry" className="nav-link">Data Entry</Link>
                </li>
                <li>
                    <Link to="/Evaluation" className="nav-link">Evaluation</Link>
                </li>
                <li>
                    <Link to="/Query" className="nav-link">Query</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
