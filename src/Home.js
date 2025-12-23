import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';

class Home extends React.Component {
    render() {
        return (
            <div>
                <Navbar />
                <div style={{ padding: '2rem' }}>
                    <h1>Home</h1>
                </div>
            </div>
        );
    }
}

export default Home;