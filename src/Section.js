import React from 'react';

class Section extends React.Component {
    render() {
        return (
            <div>
                <h1>Section</h1>
                <label htmlFor="SectionNumber">Section Number</label>
                <div>
                    <input
                        type="text"
                        id="SectionNumber"
                    />
                </div>
                <label htmlFor="CourseNumber">Course Number</label>
                <div>
                    <input
                        type="text"
                        id="CourseNumber"
                    />
                </div>
                <label htmlFor="InstructorID">Instructor ID</label>
                <div>
                    <input
                        type="text"
                        id="InstructorID"
                    />
                </div>
                <label htmlFor="Semester">Semester</label>
                <div>
                    <input
                        type="text"
                        id="Semester"
                    />
                </div>
                <label htmlFor="Year">Year</label>
                <div>
                    <input
                        type="text"
                        id="Year"
                    />
                </div>
                <label htmlFor="EnrolledStudents">Enrolled Students</label>
                <div>
                    <input
                        type="text"
                        id="EnrolledStudents"
                    />
                </div>
                <button type="submit">Submit</button>
            </div>
        );
    }
}

export default Section;