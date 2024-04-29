import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Section() {
    const [sections, setSections] = useState([]);
    const [courses, setCourses] = useState([]);
    const [instructors, setInstructors] = useState([]);
    const [state, setState] = useState({
        sectionNumber: '',
        courseNumber: '',
        instructorId: '',
        semester: '',
        year: '',
        enrolledStudents: ''
    });
    const [message, setMessage] = useState({ text: '', type: '' });

    useEffect(() => {
        fetchCourses();
        fetchInstructors();
        fetchSections();
    }, []);

    const fetchCourses = async () => {
        const response = await axios.get('http://localhost:8080/courses/');
        setCourses(response.data);
    };

    const fetchInstructors = async () => {
        const response = await axios.get('http://localhost:8080/instructors/');
        setInstructors(response.data);
    };

    const fetchSections = async () => {
        const response = await axios.get('http://localhost:8080/sections/');
        setSections(response.data);
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
            await axios.post('http://localhost:8080/sections/', {
                ...state
            });
            setMessage({ text: 'Submission successful!', type: 'success' });
            setState({ sectionNumber: '', courseNumber: '', instructorId: '', semester: '', year: '', enrolledStudents: '' });
            fetchSections();  // Refresh sections after add/update
        } catch (error) {
            setMessage({ text: 'Failed to submit. Please try again.', type: 'error' });
        }
    };

    const handleDelete = async (sectionId) => {
        try {
            await axios.delete(`http://localhost:8080/sections/${sectionId}`);
            fetchSections();  // Refresh sections after deletion
        } catch (error) {
            console.error('Failed to delete section', error);
            setMessage({ text: 'Failed to delete section. Please try again.', type: 'error' });
        }
    };

    return (
        <div>
            <h1>Section</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="sectionNumber">Section Number</label>
                    <input type="text" id="sectionNumber" value={state.sectionNumber} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="courseNumber">Course Number</label>
                    <select id="courseNumber" value={state.courseNumber} onChange={handleChange}>
                        <option value="">Select a Course</option>
                        {courses.map(course => (
                            <option key={course.courseNumber} value={course.courseNumber}>{course.courseNumber} - {course.name}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="instructorId">Instructor ID</label>
                    <select id="instructorId" value={state.instructorId} onChange={handleChange}>
                        <option value="">Select an Instructor</option>
                        {instructors.map(instructor => (
                            <option key={instructor.instructorId} value={instructor.instructorId}>{instructor.name}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="semester">Semester</label>
                    <input type="text" id="semester" value={state.semester} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="year">Year</label>
                    <input type="text" id="year" value={state.year} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="enrolledStudents">Enrolled Students</label>
                    <input type="text" id="enrolledStudents" value={state.enrolledStudents} onChange={handleChange} />
                </div>
                <button type="submit">Submit</button>
            </form>
            {message.text && <div className={message.type === 'success' ? 'success-message' : 'error-message'}>
                {message.text}
            </div>}
            <h2>All Sections</h2>
            <ul>
                {sections.map(section => (
                    <li key={section.id}>
                        Section Number: {section.sectionNumber} - Course Number: {section.courseNumber} - Instructor
                        ID: {section.instructorId} - Semester/Year: {section.semester}/{section.year} - Enrolled
                        Students: {section.enrolledStudents}
                        <button onClick={() => handleDelete(section.id)}>Delete</button>
                    </li>

                ))}
            </ul>
        </div>
    );
}

export default Section;
