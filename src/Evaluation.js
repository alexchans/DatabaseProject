import React, { useState } from 'react';
import axios from 'axios';

function Evaluation() {
    const [state, setState] = useState({
        degreeId: '',
        semester: '',
        instructorId: ''
    });
    const [sections, setSections] = useState([]); // State to hold sections data

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
            const response = await axios.get(`http://localhost:8080/sections/instructorSections/${state.instructorId}/${state.semester}`);
            setSections(response.data); // Store the sections data
        } catch (error) {
        }
    };

    return (
        <div>
            <h1>Enter Evaluation</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="degreeId">Degree ID</label>
                <div>
                    <input
                        type="text"
                        id="degreeId"
                        value={state.degreeId}
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
                <label htmlFor="instructorId">Instructor ID</label>
                <div>
                    <input
                        type="text"
                        id="instructorId"
                        value={state.instructorId}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">Request Data</button>
            </form>
            <div>
                {sections.map((section, index) => (
                    <div key={index} className='flex'>
                        <p>Section Number: {section.sectionNumber}</p>
                        <p>Course Number: {section.courseNumber}</p>
                        <p>Semester: {section.semester}</p>
                        <p>Year: {section.year}</p>
                        <p>Enrolled Students: {section.enrolledStudents}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Evaluation;
