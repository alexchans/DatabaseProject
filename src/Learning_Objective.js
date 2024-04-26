import React, { useState } from 'react';
import axios from 'axios';

function LearningObjective() {
    const [objective, setObjective] = useState({
        objectiveCode: '',
        title: '',
        description: ''
    });
    const [message, setMessage] = useState({ text: '', type: '' });

    const handleChange = (event) => {
        const { id, value } = event.target;
        setObjective(prevState => ({
            ...prevState,
            [id]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post(`http://localhost:8080/learningObjectives/`, {
                ...objective
            }
            );
            setMessage({ text: 'Submission successful!', type: 'success' });
            setObjective({ objectiveCode: '', title: '', description: '' }); // Reset form fields
        } catch (error) {
            setMessage({ text: 'Failed to submit. Please try again.', type: 'error' });
        }
    };

    return (
        <div>
            <h1>Learning Objective</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="objectiveCode">Objective Code</label>
                <div>
                    <input
                        type="text"
                        id="objectiveCode"
                        value={objective.objectiveCode}
                        onChange={handleChange}
                    />
                </div>
                <label htmlFor="title">Title</label>
                <div>
                    <input
                        type="text"
                        id="title"
                        value={objective.title}
                        onChange={handleChange}
                    />
                </div>
                <label htmlFor="description">Description</label>
                <div>
                    <input
                        type="text"
                        id="description"
                        value={objective.description}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">Submit</button>
            </form>
            {message.text && (
                <div className={message.type === 'success' ? 'success-message' : 'error-message'}>
                    {message.text}
                </div>
            )}
        </div>
    );
}

export default LearningObjective;
