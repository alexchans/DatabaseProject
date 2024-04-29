import React, { Component } from 'react';
import axios from 'axios';
// import instructor from "./Instructor";

class InstructorQuery extends Component {
    state = {
        instructors: [],
        instructorId: '',
        startSemester: '',
        startYear: '',
        endSemester: '',
        endYear: '',
        sections: [],
        message: ''
    };

    componentDidMount() {
        this.fetchInstructors();
        console.log(this.state);
    }

    fetchInstructors = async () => {
        // debugger;
        try {

            const response = await axios.get('http://localhost:8080/instructors/');
            this.setState({ instructors: response.data });

        } catch (error) {
            console.error('Failed to fetch instructors', error);
            this.setState({ message: 'Failed to load instructors. Please try again.' });
        }
    };

    handleChange = (event) => {
        // debugger;
        const { id, value } = event.target;
        console.log("Changing state for:", id, "to", value); // Debug log
        this.setState({ [id]: value });
    };

    handleSubmit = async event => {
        event.preventDefault();
        const { instructorId, startSemester, startYear, endSemester, endYear } = this.state;
        try {
            const response = await axios.get(`http://localhost:8080/sections/instructorSectionsRange`, {
                params: { instructorId, startSemester, startYear, endSemester, endYear }
            });
            this.setState({
                sections: response.data,
                message: 'Data fetched successfully!'
            });
        } catch (error) {
            console.error('Failed to fetch data', error);
            this.setState({ message: 'Failed to fetch data. Please try again.' });
        }
    };

    render() {
        const { instructors, instructorId, startSemester, startYear, endSemester, endYear, sections, message } = this.state;
        return (
            <div>
                <h1>Instructor Query</h1>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <label htmlFor="instructorId">Instructor ID</label>
                        <select id="instructorId" value={instructorId} onChange={this.handleChange}>
                            <option value="">Select an Instructor</option>
                            {instructors.map(instructor => (
                                <option key={instructor.instructorId} value={instructor.instructorId}>
                                    {instructor.name} ({instructor.instructorId})
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="startSemester">Start Semester</label>
                        <input type="text" id="startSemester" value={startSemester} onChange={this.handleChange}/>
                        <label htmlFor="startYear">Start Year</label>
                        <input type="text" id="startYear" value={startYear} onChange={this.handleChange} />
                    </div>
                    <div>
                        <label htmlFor="endSemester">End Semester</label>
                        <input type="text" id="endSemester" value={endSemester} onChange={this.handleChange} />
                        <label htmlFor="endYear">End Year</label>
                        <input type="text" id="endYear" value={endYear} onChange={this.handleChange} />
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

export default InstructorQuery;
