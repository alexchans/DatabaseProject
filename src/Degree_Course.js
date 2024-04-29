import React, { useState, useEffect } from 'react';
import axios from 'axios';

function DegreeCourse() {
    const [degrees, setDegrees] = useState([]);
    const [courses, setCourses] = useState([]);
    const [degreeCourses, setDegreeCourses] = useState([]);
    const [state, setState] = useState({
        degreeId: '',
        courseNumber: '',
        isCore: false
    });
    const [message, setMessage] = useState({ text: '', type: '' });

    useEffect(() => {
        fetchDegrees();
        fetchCourses();
        fetchDegreeCourses();
    }, []);

    const fetchDegrees = async () => {
        const response = await axios.get('http://localhost:8080/degrees/all');
        setDegrees(response.data);
    };

    const fetchCourses = async () => {
        const response = await axios.get('http://localhost:8080/courses/');
        setCourses(response.data);
    };

    const fetchDegreeCourses = async () => {
        const response = await axios.get('http://localhost:8080/degreeCourses/');
        setDegreeCourses(response.data);
    };

    const handleChange = (event) => {
        const { id, value } = event.target;
        setState(prevState => ({
            ...prevState,
            [id]: value
        }));
    };

    const handleCheckboxChange = (event) => {
        setState({
            ...state,
            isCore: event.target.checked
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post('http://localhost:8080/degreeCourses/', state);
            setMessage({ text: 'Submitted successfully!', type: 'success' });
            setState({ degreeId: '', courseNumber: '', isCore: false });
            fetchDegreeCourses();
        } catch (error) {
            setMessage({ text: 'Failed to submit. Please try again.', type: 'error' });
        }
    };

    const handleDelete = async (degreeId, courseNumber) => {
        try {
            await axios.delete(`http://localhost:8080/degreeCourses/${degreeId}/${courseNumber}`);
            fetchDegreeCourses();
        } catch (error) {
            console.error('Failed to delete degree course', error);
        }
    };

    return (
        <div>
            <h1>Connect Degree and Course</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="degreeId">Degree ID</label>
                    <select id="degreeId" value={state.degreeId} onChange={handleChange}>
                        <option value="">Select Degree</option>
                        {degrees.map((degree) => (
                            <option key={degree.degreeID} value={degree.degreeID}>
                                {degree.name} (ID: {degree.degreeID}, Level: {degree.level})
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="courseNumber">Course Number</label>
                    <select id="courseNumber" value={state.courseNumber} onChange={handleChange}>
                        <option value="">Select Course</option>
                        {courses.map((course) => (
                            <option key={course.courseNumber} value={course.courseNumber}>
                                {course.name} (Course No: {course.courseNumber})
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="isCore">Is this a Core Course?</label>
                    <input
                        type="checkbox"
                        id="isCore"
                        checked={state.isCore}
                        onChange={handleCheckboxChange}
                    />
                </div>
                <button type="submit">Submit</button>
            </form>
            {message.text && (
                <div className={message.type === 'success' ? 'success-message' : 'error-message'}>
                    {message.text}
                </div>
            )}
            <h2>All Degree-Course Connections</h2>
            <ul>
                {degreeCourses.map((dc) => (
                    <li key={`${dc.degreeId}_${dc.courseNumber}`}>
                        Degree ID: {dc.degreeId}, Course Number: {dc.courseNumber}, Core: {dc.isCore ? 'Yes' : 'No'}
                        <button onClick={() => handleDelete(dc.degreeId, dc.courseNumber)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default DegreeCourse;
