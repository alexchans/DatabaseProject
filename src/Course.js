import React from 'react';

class Course extends React.Component {
    render() {
        return (
            <div>
                <h1>Course</h1>
                <label htmlFor="CourseNumber">Course Number</label>
                <div>
                    <input
                        type="text"
                        id="CourseNumber"
                    />
                </div>
                <label htmlFor="Name">Name</label>
                <div>
                    <input
                        type="text"
                        id="Name"
                    />
                </div>

                <button type="submit">Submit</button>
            </div>
        );
    }
}

export default Course;