import React, { useState } from 'react';
import axios from 'axios';

function Section() {
    const [state, setState] = useState({
        sectionNumber: '',
        courseNumber: '',
        instructorId: '',
        semester: '',
        year: '',
        enrolledStudents: ''
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
            await axios.post(`http://localhost:8080/sections/`, {
                ...state
            });
            setMessage({ text: 'Submission successful!', type: 'success' });
            // Optionally reset form fields
            setState({ sectionNumber: '', courseNumber: '', instructorId: '', semester: '', year: '', enrolledStudents: '' });
        } catch (error) {
            setMessage({ text: 'Failed to submit. Please try again.', type: 'error' });
        }
    };

    return (
        <div>
            <h1>Section</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="sectionNumber">Section Number</label>
                <div>
                    <input
                        type="text"
                        id="sectionNumber"
                        value={state.sectionNumber}
                        onChange={handleChange}
                    />
                </div>
                <label htmlFor="courseNumber">Course Number</label>
                <div>
                    <input
                        type="text"
                        id="courseNumber"
                        value={state.courseNumber}
                        onChange={handleChange}
                    />
                </div>
                <label htmlFor="instructorId">Instructor ID</label>
                <div>
                    <input
                        type="text"
                        id="instructorId"
                        value={state.instructorId}
                        onChange={handleChange}
                    />
                </div>
                <label htmlFor="semester">Semester</label>
                <div>
                    <input
                        type="text"
                        id="semester"
                        value={state.semester}
                        onChange={handleChange}
                    />
                </div>
                <label htmlFor="year">Year</label>
                <div>
                    <input
                        type="text"
                        id="year"
                        value={state.year}
                        onChange={handleChange}
                    />
                </div>
                <label htmlFor="enrolledStudents">Enrolled Students</label>
                <div>
                    <input
                        type="text"
                        id="enrolledStudents"
                        value={state.enrolledStudents}
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

export default Section;
