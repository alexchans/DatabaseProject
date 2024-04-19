import React from 'react';

class Evaluation extends React.Component {
    render() {
        return (
            <div>
                <h1>Enter Evaluation</h1>
                <label htmlFor="DegreeID">Degree ID</label>
                <div>
                    <input
                        type="text"
                        id="DegreeID"
                    />
                </div>
                <label htmlFor="Semester">Semester</label>
                <div>
                    <input
                        type="text"
                        id="Semester"
                    />
                </div>
                <label htmlFor="Instructor">Instructor</label>
                <div>
                    <input
                        type="text"
                        id="Instructor"
                    />
                </div>
                <button type="submit">Request Data</button>
            </div>
        );
    }
}

export default Evaluation;