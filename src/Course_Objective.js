import React, { useState } from 'react';
import axios from 'axios';

function CourseObjective() {
    const [state, setState] = useState({
        courseNumber: '',
        objectiveCode: ''
    });
    const [message, setMessage] = useState({ text: '', type: '' });

    const handleChange = (event) => {
        const { id, value } = event.target;
        setState(prevState => ({
            ...prevState,
            [id]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post(`http://localhost:8080/courseObjectives/`, {
                courseNumber: state.courseNumber,
                objectiveCode: state.objectiveCode
            });
            setMessage({ text: 'Submission successful!', type: 'success' });
            setState({ courseNumber: '', objectiveCode: '' }); // Reset form fields after successful submission
        } catch (error) {
            setMessage({ text: 'Failed to submit. Please try again.', type: 'error' });
        }
    };

    return (
        <div>
            <h1>Connect Course and Objective</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="courseNumber">Course Number</label>
                <div>
                    <input
                        type="text"
                        id="courseNumber"
                        value={state.courseNumber}
                        onChange={handleChange}
                    />
                </div>
                <label htmlFor="objectiveCode">Objective Code</label>
                <div>
                    <input
                        type="text"
                        id="objectiveCode"
                        value={state.objectiveCode}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">Submit</button>
            </form>
            {message.text && <div className={message.type === 'success' ? 'success-message' : 'error-message'}>
                {message.text}
            </div>}
        </div>
    );
}

export default CourseObjective;
