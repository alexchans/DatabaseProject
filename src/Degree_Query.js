import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function DegreeCourses() {
    const [degreeId, setDegreeId] = useState('');
    const [currentCourseNumber, setCurrentCourseNumber] = useState('');
    const [startSemester, setStartSemester] = useState('');
    const [startYear, setStartYear] = useState('');
    const [endSemester, setEndSemester] = useState('');
    const [endYear, setEndYear] = useState('');
    const [courses, setCourses] = useState([]);
    const [submitted, setSubmitted] = useState(false);
    const [objectiveCodes, setObjectiveCodes] = useState({});
    const [sections, setSections] = useState([]);


    const handleInputChange = (event) => {
        const { id, value } = event.target;
        switch (id) {
            case "DegreeID":
                setDegreeId(value);
                break;
            case "startSemester":
                setStartSemester(value);
                break;
            case "startYear":
                setStartYear(value);
                break;
            case "endSemester":
                setEndSemester(value);
                break;
            case "endYear":
                setEndYear(value);
                break;
            default:
                break;
        }
        setSubmitted(false); // Reset submission state on any input change
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setSubmitted(true);
        try {
            // Update URL to potentially use date range filters
            const url = `http://localhost:8080/degreeCourses/${degreeId}?startSemester=${startSemester}&startYear=${startYear}&endSemester=${endSemester}&endYear=${endYear}`;
            const response = await axios.get(url);
            const courseData = response.data.map(course => ({
                courseNumber: course.courseNumber,
                isCore: course.isCore
            }));
            setCourses(courseData);
            setObjectiveCodes({});
        } catch (error) {
            console.error('Error fetching courses', error);
            setCourses([]); // Clear any previous data
        }
    };

    const handleObjective = async (courseNumber, event) => {
        event.preventDefault();
        setCurrentCourseNumber(courseNumber);
        if (!objectiveCodes[courseNumber]) {
            try {
                const response = await axios.get(`http://localhost:8080/courseObjectives/get/${courseNumber}`);
                setObjectiveCodes(prev => ({
                    ...prev,
                    [courseNumber]: response.data
                }));
            } catch (error) {
                console.error('Error fetching objective codes', error);
            }
        }
    };

    const handleRange = async (event) => {
        event.preventDefault();
        try {
            // Construct the API URL with query parameters directly in the string
            const url = `http://localhost:8080/sections/range?courseNumber=${currentCourseNumber}&startSemester=${startSemester}&startYear=${startYear}&endSemester=${endSemester}&endYear=${endYear}`;
            const response = await axios.get(url);
            setSections(response.data);
        } catch (error) {
            setSections([]);
        }
    };


    return (
        <div>
            <h1>Query Degree Courses</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="DegreeID">Degree ID:</label>
                <input type="text" id="DegreeID" value={degreeId} onChange={handleInputChange} />
                <button type="submit">Request Data</button>
            </form>
            {submitted && (
                <div>
                    <h2>Courses for Degree {degreeId}</h2>
                    <ul>
                        {courses.length > 0 ? courses.map((course, index) => (
                            <li key={index} onClick={(event) => handleObjective(course.courseNumber, event)}>
                                Course Number: {course.courseNumber}, Is Core: {course.isCore ? 'Yes' : 'No'}
                                {objectiveCodes[course.courseNumber] && (
                                    <div>
                                        <strong>Objective Codes:</strong>
                                        <ul>
                                            {objectiveCodes[course.courseNumber].map((objective, idx) => (
                                                <li key={idx}>{objective.objectiveCode}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </li>
                        )) : <p>No courses found for this degree.</p>}
                    </ul>
                </div>
            )}
            <form onSubmit={handleRange}>
                <label htmlFor="startSemester">Start Semester:</label>
                <input type="text" id="startSemester" value={startSemester} onChange={handleInputChange} />
                <label htmlFor="startYear">Start Year:</label>
                <input type="text" id="startYear" value={startYear} onChange={handleInputChange} />
                <label htmlFor="endSemester">End Semester:</label>
                <input type="text" id="endSemester" value={endSemester} onChange={handleInputChange} />
                <label htmlFor="endYear">End Year:</label>
                <input type="text" id="endYear" value={endYear} onChange={handleInputChange} />
                <button type="submit">Retrive Courses In Range</button>
            </form>
            {sections.length > 0 && (
                <div>
                    <h2>Sections Details</h2>
                    <ul>
                        {sections.map((section, index) => (
                            <li key={index}>
                                Course Number: {section.courseNumber}, Semester: {section.semester}, Year: {section.year}
                                {/* Include other section details as needed */}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default DegreeCourses;
