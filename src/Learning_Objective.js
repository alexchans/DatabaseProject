import React, { useState, useEffect } from 'react';
import axios from 'axios';

function LearningObjective() {
    const [objectives, setObjectives] = useState([]); // Store the list of objectives
    const [objective, setObjective] = useState({
        objectiveCode: '',
        title: '',
        description: ''
    });
    const [message, setMessage] = useState({ text: '', type: '' });

    useEffect(() => {
        fetchObjectives(); // Fetch objectives when the component mounts
    }, []);

    const fetchObjectives = async () => {
        try {
            const response = await axios.get('http://localhost:8080/learningObjectives/');
            setObjectives(response.data); // Set the objectives state to the fetched data
        } catch (error) {
            setMessage({ text: 'Failed to fetch objectives. Please try again.', type: 'error' });
        }
    };

    const handleChange = (event) => {
        const { id, value } = event.target;
        setObjective(prevState => ({
            ...prevState,
            [id]: value
        }));
    };
    const handleDelete = async (objectiveCode) => {
        try {
            await axios.delete(`http://localhost:8080/learningObjectives/${objectiveCode}`);
            fetchObjectives(); // Refresh the list of objectives after deletion
        } catch (error) {
            console.error('Failed to delete objective', error);
            setMessage({ text: 'Failed to delete objective. Please try again.', type: 'error' });
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post('http://localhost:8080/learningObjectives/', {
                ...objective
            });
            setMessage({ text: 'Submission successful!', type: 'success' });
            setObjective({ objectiveCode: '', title: '', description: '' }); // Reset form fields
            fetchObjectives(); // Refresh the list of objectives
        } catch (error) {
            setMessage({ text: 'Failed to submit. Please try again.', type: 'error' });
        }
    };

    return (
        <div>
            <h1>Learning Objective</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="objectiveCode">Objective Code</label>
                <input
                    type="text"
                    id="objectiveCode"
                    value={objective.objectiveCode}
                    onChange={handleChange}
                />
                <label htmlFor="title">Title</label>
                <input
                    type="text"
                    id="title"
                    value={objective.title}
                    onChange={handleChange}
                />
                <label htmlFor="description">Description</label>
                <input
                    type="text"
                    id="description"
                    value={objective.description}
                    onChange={handleChange}
                />
                <button type="submit">Submit</button>
            </form>
            {message.text && (
                <div className={message.type === 'success' ? 'success-message' : 'error-message'}>
                    {message.text}
                </div>
            )}
            <h2>All Learning Objectives</h2>
            <ul>
                {objectives.map(obj => (
                    <li key={obj.objectiveCode}>
                        {obj.objectiveCode} - {obj.title}: {obj.description}
                        <button onClick={() => handleDelete(obj.objectiveCode)}>Delete</button>
                    </li>
                ))}
            </ul>

        </div>
    );
}

export default LearningObjective;
