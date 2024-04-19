import React from 'react';
import { Link } from 'react-router-dom';

class Query extends React.Component {
    render() {
        return (
            <div>
                <h1>Query</h1>
                <div className='flex'>
                    <Link className='no-underline' to="/Degree_Query">Degree Query</Link>
                    <Link className='no-underline' to="/Course_Query">Course Query</Link>
                    <Link className='no-underline' to="/Instructor_Query">Instructor Query</Link>
                    <Link className='no-underline' to="/Evaluation_Query">Evaluation Query</Link>
                </div>
            </div>
        );
    }
}

export default Query;