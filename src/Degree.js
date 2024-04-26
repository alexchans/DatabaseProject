import React, { useState } from 'react';
import axios from 'axios';

function Degree() {
    const [state, setState] = useState({
        name: '',
        level: ''
    });
    const [message, setMessage] = useState({ text: '', type: '' }); // Added for feedback message

    const handleChange = (event) => {
        const { id, value } = event.target;
        setState(prevState => ({
            ...prevState,
            [id.toLowerCase()]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevents the default form submission behavior
        try {
            await axios.post(`http://localhost:8080/degrees/create`, {
                name: state.name,
                level: state.level
            });
            setMessage({ text: 'Submission successful!', type: 'success' }); // Set success message
            setState({ name: '', level: '' }); // Optionally reset form fields
        } catch (error) {
            setMessage({ text: 'Failed to submit. Please try again.', type: 'error' }); // Set error message
        }
    };

    return (
        <div>
            <h1>Degree</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="Name">Name</label>
                <div>
                    <input
                        type="text"
                        id="Name"
                        value={state.name}
                        onChange={handleChange}
                    />
                </div>
                <label htmlFor="Level">Level</label>
                <div>
                    <input
                        type="text"
                        id="Level"
                        value={state.level}
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

export default Degree;
