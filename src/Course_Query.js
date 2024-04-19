import React from 'react';

class Course_Query extends React.Component {
    render() {
        return (
            <div>
                <h1>Course Query</h1>
                <label htmlFor="CourseNumber">Course Number</label>
                <div>
                    <input
                        type="text"
                        id="CourseNumber"
                    />
                </div>
                <button type="submit">Request Data</button>
            </div>
        );
    }
}

export default Course_Query;