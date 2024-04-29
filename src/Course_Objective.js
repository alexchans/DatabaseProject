import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CourseObjective() {
    const [courses, setCourses] = useState([]);
    const [objectives, setObjectives] = useState([]);
    const [courseObjectives, setCourseObjectives] = useState([]);
    const [state, setState] = useState({ courseNumber: '', objectiveCode: '' });
    const [message, setMessage] = useState({ text: '', type: '' });

    useEffect(() => {
        fetchCourses();
        fetchObjectives();
        fetchCourseObjectives();
    }, []);

    const fetchCourses = async () => {
        const response = await axios.get('http://localhost:8080/courses/');
        setCourses(response.data);
    };

    const fetchObjectives = async () => {
        const response = await axios.get('http://localhost:8080/learningObjectives/');
        setObjectives(response.data);
    };

    const fetchCourseObjectives = async () => {
        const response = await axios.get('http://localhost:8080/courseObjectives/');
        setCourseObjectives(response.data);
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
            await axios.post('http://localhost:8080/courseObjectives/', state);
            setMessage({ text: 'Objective linked successfully!', type: 'success' });
            setState({ courseNumber: '', objectiveCode: '' });
            fetchCourseObjectives();
        } catch (error) {
            setMessage({ text: 'Failed to link objective. Please try again.', type: 'error' });
        }
    };

    const handleDelete = async (courseNumber, objectiveCode) => {
        try {
            await axios.delete(`http://localhost:8080/courseObjectives/${courseNumber}/${objectiveCode}`);
            fetchCourseObjectives();
        } catch (error) {
            console.error('Failed to delete objective link', error);
        }
    };

    return (
        <div>
            <h1>Connect Course and Objective</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="courseNumber">Course Number</label>
                <select id="courseNumber" value={state.courseNumber} onChange={handleChange}>
                    <option value="">Select a Course</option>
                    {courses.map(course => (
                        <option key={course.courseNumber} value={course.courseNumber}>{course.name} ({course.courseNumber})</option>
                    ))}
                </select>

                <label htmlFor="objectiveCode">Objective Code</label>
                <select id="objectiveCode" value={state.objectiveCode} onChange={handleChange}>
                    <option value="">Select an Objective</option>
                    {objectives.map(obj => (
                        <option key={obj.objectiveCode} value={obj.objectiveCode}>{obj.title} ({obj.objectiveCode})</option>
                    ))}
                </select>

                <button type="submit">Submit</button>
            </form>
            {message.text && (
                <div className={message.type === 'success' ? 'success-message' : 'error-message'}>
                    {message.text}
                </div>
            )}
            <h2>List of Course Objectives</h2>
            <ul>
                {courseObjectives.map(obj => (
                    <li key={`${obj.courseNumber}_${obj.objectiveCode}`}>
                        Course Number: {obj.courseNumber}, Objective Code: {obj.objectiveCode}
                        <button onClick={() => handleDelete(obj.courseNumber, obj.objectiveCode)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default CourseObjective;
