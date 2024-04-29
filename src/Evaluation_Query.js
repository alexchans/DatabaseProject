import React from 'react';
import axios from 'axios';

class Evaluation_Query extends React.Component {
    state = {
        semester: '',
        passRatePercentage: '',
        sections: [],
        message: ''
    };

    handleChange = (event) => {
        this.setState({ [event.target.id]: event.target.value });
    };

    handleSubmit = async (event) => {
        event.preventDefault();
        const { semester, passRatePercentage } = this.state;
        try {
            const response = await axios.get(`http://localhost:8080/sections/passRate`, {
                params: { semester, passRatePercentage }
            });
            this.setState({ sections: response.data, message: 'Data fetched successfully!' });
            // debugger;
        } catch (error) {
            console.error('Failed to fetch data', error);
            this.setState({ message: 'Failed to fetch data. Please try again.' });
        }
    };

    render() {
        const { semester, passRatePercentage, sections, message } = this.state;
        return (
            <div>
                <h1>Evaluation Query</h1>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <label htmlFor="semester">Semester</label>
                        <select id="semester" value={semester} onChange={this.handleChange}>
                            <option value="">Select Semester</option>
                            <option value="Spring">Spring</option>
                            <option value="Summer">Summer</option>
                            <option value="Fall">Fall</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="passRatePercentage">Pass Rate Percentage (0-100 integer, -1 means retrieve even those with no evaluation)</label>
                        <input
                            type="number"
                            id="passRatePercentage"
                            value={passRatePercentage}
                            onChange={this.handleChange}
                        />
                    </div>
                    <button type="submit">Request Data</button>
                </form>
                {message && <div>{message}</div>}
                <h2>Section Results</h2>
                <ul>
                    {sections.map((section, index) => (
                        <li key={index}>
                            <strong>Section Number:</strong> {section.section.sectionNumber}<br/>
                            <strong>Course Number:</strong> {section.section.courseNumber}<br/>
                            <strong>Semester:</strong> {section.section.semester}<br/>
                            <strong>Year:</strong> {section.section.year}<br/>
                            <strong>Instructor ID:</strong> {section.section.instructorId}<br/>
                            <strong>Enrolled Students:</strong> {section.section.enrolledStudents}<br/>
                            <strong>Evaluation Status:</strong> {(section.levelACount + section.levelBCount + section.levelCCount + section.levelFCount > 0) ?  'Complete' : 'Not Entered'}<br/>
                            <strong>Improvement Suggestion:</strong> {(section.improvementSuggestion ? 'Entered' : 'Not Entered') + ': ' +  section.improvementSuggestion}
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}

export default Evaluation_Query;
