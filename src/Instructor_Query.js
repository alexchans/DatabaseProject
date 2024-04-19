import React from 'react';

class Instructor_Query extends React.Component {
    render() {
        return (
            <div>
                <h1>Instructor Query</h1>
                <label htmlFor="InstructorID">Instructor ID</label>
                <div>
                    <input
                        type="text"
                        id="InstructorID"
                    />
                </div>
                <button type="submit">Request Data</button>
            </div>
        );
    }
}

export default Instructor_Query;