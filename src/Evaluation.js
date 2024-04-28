import React from 'react';
import axios from 'axios';
//this is the evaluation file 
class Evaluation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            degreeId: '',
            semester: '',
            instructor: '',
            message: { text: '', type: '' }
        };

        // Bind handlers
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const { id, value } = event.target;
        this.setState(prevState => ({
            ...prevState,
            [id]: value
        }));
    }

    handleSubmit(event) {
        event.preventDefault();
        try {
            axios.post(`http://localhost:8080/Evaluation/`, {
                degreeId: this.state.degreeId,
                semester: this.state.semester,
                instructor: this.state.instructor
            });
            this.setState({ message: { text: 'Submitted successful!', type: 'success' } });
            this.setState({ degreeId: '', semester: '', instructor: '' });
        } catch (error) {
            this.setState({ message: { text: 'Failed to submit. Please try again.', type: 'error' } });
        }
    }

    render() {
        return (
            <div>
                <h1>Enter Evaluation</h1>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="degreeId">Degree ID</label>
                    <div>
                        <input
                            type="text"
                            id="degreeId"
                            value={this.state.degreeId}
                            onChange={this.handleChange}
                        />
                    </div>
                    <label htmlFor="semester">Semester</label>
                    <div>
                        <input
                            type="text"
                            id="semester"
                            value={this.state.semester}
                            onChange={this.handleChange}
                        />
                    </div>
                    <label htmlFor="instructor">Instructor</label>
                    <div>
                        <input
                            type="text"
                            id="instructor"
                            value={this.state.instructor}
                            onChange={this.handleChange}
                        />
                    </div>
                    <button type="submit">Request Data</button>
                </form>
                {this.state.message.text && (
                    <div className={this.state.message.type}>
                        {this.state.message.text}
                    </div>
                )}
            </div>
        );
    }
}

export default Evaluation;