import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function EditEvaluation() {
    const [section, setSection] = useState({
        courseNumber: '',
        sectionNumber: '',
        semester: '',
        year: '',
        instructorId: '',
        enrolledStudents: ''
    });
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        axios.get(`http://localhost:8080/sections/${id}`)
            .then(response => {
                setSection(response.data);
            })
            .catch(error => {
                console.log(error);
                alert('Error fetching section data');
            });
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSection(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:8080/sections/${id}`, section)
            .then(response => {
                alert('Section updated successfully');
                navigate('/Evaluation'); // Assuming this is the path you want to return to after the update
            })
            .catch(error => {
                alert('Failed to update section');
                console.error('Update error:', error);
            });
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1>Edit Section</h1>
            <label>Course Number:</label>
            <input
                name="courseNumber"
                value={section.courseNumber}
                onChange={handleChange}
                placeholder="Course Number"
            />
            <label>Section Number:</label>
            <input
                name="sectionNumber"
                value={section.sectionNumber}
                onChange={handleChange}
                placeholder="Section Number"
            />
            <label>Semester:</label>
            <input
                name="semester"
                value={section.semester}
                onChange={handleChange}
                placeholder="Semester"
            />
            <label>Year:</label>
            <input
                name="year"
                value={section.year}
                onChange={handleChange}
                placeholder="Year"
            />
            <button type="submit">Save Changes</button>
        </form>
    );
}

export default EditEvaluation;
