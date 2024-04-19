import React from 'react';

class Course_Objective extends React.Component {
    render() {
        return (
            <div>
                <h1>Connect Course and Objective</h1>
                <label htmlFor="CourseNumber">Course Number</label>
                <div>
                    <input
                        type="text"
                        id="CourseNumber"
                    />
                </div>
                <label htmlFor="ObjectiveCode">Objective Code</label>
                <div>
                    <input
                        type="text"
                        id="ObjectiveCode"
                    />
                </div>

                <button type="submit">Submit</button>
            </div>
        );
    }
}

export default Course_Objective;