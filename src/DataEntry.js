import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import './DataEntry.css';

class DataEntry extends React.Component {
    render() {
        return (
            <div className="data-entry-page">
                <Navbar />
                <div className="data-entry-container">
                    <h1 className="page-title">Data Entry</h1>
                    <div className="options-grid">
                        <Link className='option-card' to="/Degree">
                            <h2>Degree</h2>
                        </Link>
                        <Link className='option-card' to="/Course">
                            <h2>Course</h2>
                        </Link>
                        <Link className='option-card' to="/Degree_Course">
                            <h2>Connect Degree & Course</h2>
                        </Link>
                        <Link className='option-card' to="/Instructor">
                            <h2>Instructor</h2>
                        </Link>
                        <Link className='option-card' to="/Section">
                            <h2>Section</h2>
                        </Link>
                        <Link className='option-card' to="/Learning_Objective">
                            <h2>Learning Objective</h2>
                        </Link>
                        <Link className='option-card' to="/Course_Objective">
                            <h2>Connect Course & Objective</h2>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default DataEntry;