import React from 'react';
import axios from 'axios';

class Evaluation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            buttonClicked: false,
            degreeId: '',
            semester: '',
            instructor: '',
            sections: [],  // State to hold fetched sections
            message: { text: '', type: '' }
        };

        // Bind handlers
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const { id, value } = event.target;
        this.setState({ [id]: value });
    }

    handleSubmit(event) {
        event.preventDefault();
        const { degreeId, semester, instructor } = this.state;
        axios.post(`http://localhost:8080/Evaluation/${degreeId}/${semester}/${instructor}`)
            .then(response => {
                // Sort the sections by year in descending order
                const sections = response.data.sort((a, b) => b.year - a.year);
    
                this.setState({
                    sections: sections,  // Set the sorted sections to state
                    message: { text: 'Data fetched successfully!', type: 'success' }
                });
            })
            .catch(error => {
                this.setState({
                    message: { text: 'Failed to fetch data. Please try again.', type: 'error' }
                });
                console.error('Fetching error:', error);
            });
        this.setState({ buttonClicked: true });
    }
    

    render() {
        const { buttonClicked, degreeId, semester, instructor, sections, message } = this.state;
        return (
            <div>
                <h1>Enter Evaluation</h1>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="degreeId"> Degree ID</label>
                    <input
                        type="text"
                        id="degreeId"
                        value={degreeId}
                        onChange={this.handleChange}
                    />
                    <label htmlFor="semester"> Semester</label>
                    <input
                        type="text"
                        id="semester"
                        value={semester}
                        onChange={this.handleChange}
                    />
                    <label htmlFor="instructor"> Instructor</label>
                    <input
                        type="text"
                        id="instructor"
                        value={instructor}
                        onChange={this.handleChange}
                    />
                    <button type="submit">Change Sections</button>
                </form>
                {message.text && (
                    <div className={message.type}>
                        {message.text}
                    </div>
                )}
                <h2>Sections:</h2>
                {
                    buttonClicked && sections.length === 0 ? 
                    <p>No Courses!</p> : 
                    sections.map((section, index) => (
                        <div key={index}>
                            <p> {semester} {section.year} - {section.courseNumber} {section.sectionNumber} </p>
                        </div>
                    ))
                }
            </div>
        );
    }
}

export default Evaluation;
