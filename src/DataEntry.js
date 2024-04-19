import React from 'react';
import { Link } from 'react-router-dom';

class DataEntry extends React.Component {
    render() {
        return (
            <div>
                <h1>Data Entry</h1>
                <div className='flex'>
                    <Link className='no-underline' to="/Degree">Degree</Link>
                    <Link className='no-underline' to="/Course">Course</Link>
                    <Link className='no-underline' to="/Degree_Course">Connect Degree and Course</Link>
                    <Link className='no-underline' to="/Instructor">Instructor</Link>
                    <Link className='no-underline' to="/Section">Section</Link>
                    <Link className='no-underline' to="/Learning_Objective">Learning Objective</Link>
                    <Link className='no-underline' to="/Course_Objective">Connect Course And Objective</Link>
                </div>
            </div>
        );
    }
}

export default DataEntry;