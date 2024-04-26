import React, { useState } from 'react';
import axios from 'axios';

function Instructor() {
    const [state, setState] = useState({
        name: ''
    });
    const [message, setMessage] = useState({ text: '', type: '' }); // Added for feedback message

    const handleChange = (event) => {
        const { id, value } = event.target;
        setState(prevState => ({
            ...prevState,
            [id]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevents the default form submission behavior
        try {
            await axios.post(`http://localhost:8080/instructors/`, {
                name: state.name
            });
            setMessage({ text: 'Submission successful!', type: 'success' }); // Set success message
            setState({ courseNumber: '', name: '' }); // Optionally reset form fields
        } catch (error) {
            setMessage({ text: 'Failed to submit. Please try again.', type: 'error' }); // Set error message
        }
    };

    return (
        <div>
            <h1>Instructor</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Name</label>
                <div>
                    <input
                        type="text"
                        id="name"
                        value={state.name}
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

export default Instructor;
