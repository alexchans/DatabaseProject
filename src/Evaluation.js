import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

class EvaluationClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            degreeId: '',
            semester: '',
            instructor: '',
            sections: [],
            message: { text: '', type: '' }
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleEditClick = this.handleEditClick.bind(this);
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
                const sortedSections = response.data.sort((a, b) => b.year - a.year);
                this.setState({
                    sections: sortedSections,
                    message: { text: 'Data fetched successfully!', type: 'success' }
                });
            })
            .catch(error => {
                this.setState({
                    message: { text: 'Failed to fetch data. Please try again.', type: 'error' }
                });
                console.error('Fetching error:', error);
            });
    }

    handleEditClick(sectionId) {
        this.props.navigate(`/edit-evaluation/${sectionId}`);
    }

    render() {
        const { degreeId, semester, instructor, sections, message } = this.state;
        return (
            <div>
                <h1>Enter Evaluation</h1>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="degreeId">Degree ID</label>
                    <input type="text" id="degreeId" value={degreeId} onChange={this.handleChange} />
                    <label htmlFor="semester">Semester</label>
                    <input type="text" id="semester" value={semester} onChange={this.handleChange} />
                    <label htmlFor="instructor">Instructor</label>
                    <input type="text" id="instructor" value={instructor} onChange={this.handleChange} />
                    <button type="submit">Fetch Sections</button>
                </form>
                {message.text && (
                    <div className={message.type}>{message.text}</div>
                )}
                <h2>Sections:</h2>
                {sections.map((section, index) => (
                    <div key={index}>
                        <p>{semester} {section.year} - {section.courseNumber} {section.sectionNumber}</p>
                        <button onClick={() => this.handleEditClick(section.id)}>Edit</button>
                    </div>
                ))}
            </div>
        );
    }
}

function Evaluation() {
    const navigate = useNavigate();
    return <EvaluationClass navigate={navigate} />;
}

export default Evaluation;
