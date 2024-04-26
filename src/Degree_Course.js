import React, { useState } from 'react';
import axios from 'axios';

function DegreeCourse() {
    const [state, setState] = useState({
        degreeId: '',
        courseNumber: '',
        isCore: ''
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
            await axios.post(`http://localhost:8080/degreeCourses/`, {
                degreeId: state.degreeId,
                courseNumber: state.courseNumber,
                isCore: state.isCore.toUpperCase() === 'Y'
            });
            setMessage({ text: 'Submitted successful!', type: 'success' });
            setState({ degreeId: '', courseNumber: '', isCore: '' });
        } catch (error) {
            setMessage({ text: 'Failed to submit. Please try again.', type: 'error' });
        }
    };

    return (
        <div>
            <h1>Connect Degree and Course</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="degreeId">DegreeID</label>
                <div>
                    <input
                        type="text"
                        id="degreeId"
                        value={state.degreeId}
                        onChange={handleChange}
                    />
                </div>
                <label htmlFor="courseNumber">CourseNumber</label>
                <div>
                    <input
                        type="text"
                        id="courseNumber"
                        value={state.courseNumber}
                        onChange={handleChange}
                    />
                </div>
                <label htmlFor="isCore">Is this a Core Course? Y for yes and N for no</label>
                <div>
                    <input
                        type="text"
                        id="isCore"
                        value={state.isCore}
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

export default DegreeCourse;
