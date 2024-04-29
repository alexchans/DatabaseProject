import React from 'react';
import axios from 'axios';

class Course_Query extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            courses: [], // Adding state to hold courses
            courseNumber: '',
            startSemester: '',
            startYear: '',
            endSemester: '',
            endYear: '',
            sections: [],
            message: ''
        };
    }

    componentDidMount() {
        this.fetchCourses();
    }

    fetchCourses = async () => {
        try {
            const response = await axios.get('http://localhost:8080/courses/');
            this.setState({ courses: response.data });
        } catch (error) {
            console.error('Failed to fetch courses', error);
            this.setState({ message: 'Failed to load courses. Please try again.' });
        }
    };

    handleChange = (event) => {
        this.setState({ [event.target.id]: event.target.value });
    };

    handleSubmit = async (event) => {
        event.preventDefault();
        const { courseNumber, startSemester, startYear, endSemester, endYear } = this.state;
        try {
            const response = await axios.get(`http://localhost:8080/sections/range`, {
                params: { courseNumber, startSemester, startYear, endSemester, endYear }
            });
            this.setState({ sections: response.data, message: 'Data fetched successfully!' });
        } catch (error) {
            console.error('Failed to fetch data', error);
            this.setState({ message: 'Failed to fetch data. Please try again.' });
        }
    };

    render() {
        const { courses, courseNumber, startSemester, startYear, endSemester, endYear, sections, message } = this.state;
        return (
            <div>
                <h1>Course Query</h1>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <label htmlFor="courseNumber">Course Number</label>
                        <select
                            id="courseNumber"
                            value={courseNumber}
                            onChange={this.handleChange}
                        >
                            <option value="">Select a Course</option>
                            {courses.map((course) => (
                                <option key={course.courseNumber} value={course.courseNumber}>
                                    {course.name} ({course.courseNumber})
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="startSemester">Start Semester</label>
                        <input
                            type="text"
                            id="startSemester"
                            value={startSemester}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="startYear">Start Year</label>
                        <input
                            type="text"
                            id="startYear"
                            value={startYear}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="endSemester">End Semester</label>
                        <input
                            type="text"
                            id="endSemester"
                            value={endSemester}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="endYear">End Year</label>
                        <input
                            type="text"
                            id="endYear"
                            value={endYear}
                            onChange={this.handleChange}
                        />
                    </div>
                    <button type="submit">Request Data</button>
                </form>
                {message && <div>{message}</div>}
                <h2>Section Results</h2>
                <ul>
                    {sections.map(section => (
                        <li key={`${section.sectionNumber}_${section.semester}_${section.year}`}>
                            {`Section: ${section.sectionNumber}, Course: ${section.courseNumber}, Semester/Year: ${section.semester}/${section.year}`}
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}

export default Course_Query;
