import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Instructor() {
    const [instructors, setInstructors] = useState([]);
    const [state, setState] = useState({ name: '' });
    const [message, setMessage] = useState({ text: '', type: '' });

    useEffect(() => {
        fetchInstructors();
    }, []);

    const fetchInstructors = async () => {
        try {
            const response = await axios.get('http://localhost:8080/instructors/');
            setInstructors(response.data);
        } catch (error) {
            console.error('Failed to fetch instructors', error);
            setMessage({ text: 'Failed to fetch instructors. Please try again.', type: 'error' });
        }
    };

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
            await axios.post('http://localhost:8080/instructors/', state);
            setMessage({ text: 'Submission successful!', type: 'success' });
            setState({ name: '' });  // Reset form fields
            fetchInstructors();  // Refresh list after adding
        } catch (error) {
            setMessage({ text: 'Failed to submit. Please try again.', type: 'error' });
        }
    };

    const handleDelete = async (instructorId) => {
        try {
            await axios.delete(`http://localhost:8080/instructors/${instructorId}`);
            fetchInstructors();  // Refresh list after deletion
        } catch (error) {
            console.error('Failed to delete instructor', error);
        }
    };

    return (
        <div>
            <h1>Instructor</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Name</label>
                <input
                    type="text"
                    id="name"
                    value={state.name}
                    onChange={handleChange}
                />
                <button type="submit">Submit</button>
            </form>
            {message.text && <div className={message.type === 'success' ? 'success-message' : 'error-message'}>
                {message.text}
            </div>}
            <h2>All Instructors</h2>
            <ul>
                {instructors.map(instructor => (
                    <li key={instructor.instructorId}>
                        {instructor.name} (ID: {instructor.instructorId})
                        <button onClick={() => handleDelete(instructor.instructorId)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Instructor;
