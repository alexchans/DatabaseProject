import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import './Home.css';

class Home extends React.Component {
    render() {
        return (
            <div className="home-container">
                <Navbar />
                
                <header className="hero-section">
                    <h1 className="hero-title">Database Management System</h1>
                    <p className="hero-subtitle">
                        Efficiently manage courses, degrees, instructors, and evaluations with our comprehensive database solution.
                    </p>
                </header>

                <main className="features-container">
                    <h2 className="section-title">Quick Access</h2>
                    <div className="features-grid">
                        <Link to="/DataEntry" className="feature-card">
                            <div className="card-icon">📝</div>
                            <h3 className="card-title">Data Entry</h3>
                            <p className="card-description">
                                Add and manage new records for students, courses, and faculty members.
                            </p>
                        </Link>

                        <Link to="/Evaluation" className="feature-card">
                            <div className="card-icon">📊</div>
                            <h3 className="card-title">Evaluation</h3>
                            <p className="card-description">
                                Track and analyze performance metrics and course evaluations.
                            </p>
                        </Link>

                        <Link to="/Query" className="feature-card">
                            <div className="card-icon">🔍</div>
                            <h3 className="card-title">Query System</h3>
                            <p className="card-description">
                                Search and filter through the database to find specific information.
                            </p>
                        </Link>
                    </div>
                </main>
            </div>
        );
    }
}

export default Home;