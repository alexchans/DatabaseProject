import React from 'react';
import { Link } from 'react-router-dom';

class Home extends React.Component {
    render() {
        return (
            <div>
                <h1>Home</h1>
                <div className='flex'>
                    <Link className='no-underline' to="/DataEntry">DataEntry</Link>
                    <Link className='no-underline' to="/Evaluation">Evaluation</Link>
                    <Link className='no-underline' to="/Query">Query</Link>
                </div>
            </div>
        );
    }
}

export default Home;