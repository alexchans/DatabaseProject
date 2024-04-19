import React from 'react';

class Degree_Course extends React.Component {
    render() {
        return (
            <div>
                <h1>Connect Degree and Course</h1>
                <label htmlFor="DegreeID">DegreeID</label>
                <div>
                    <input
                        type="text"
                        id="DegreeID"
                    />
                </div>
                <label htmlFor="CourseNumber">CourseNumber</label>
                <div>
                    <input
                        type="text"
                        id="CourseNumber"
                    />
                </div>
                <label htmlFor="IsCore">Is this a Core Course? Y for yes and N for no</label>
                <div>
                    <input
                        type="text"
                        id="IsCore"
                    />
                </div>

                <button type="submit">Submit</button>
            </div>
        );
    }
}

export default Degree_Course;