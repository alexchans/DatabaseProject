import React, { useState } from 'react';
import axios from 'axios';

function Evaluation() {
    const [state, setState] = useState({
        degreeId: '',
        semester: '',
        instructorId: '',
        objectiveCode: '',
        method: '',
        levelACount: 0, // Assuming initial value should be 0
        levelBCount: 0,
        levelCCount: 0,
        levelFCount: 0,
        improvementSuggestion: '',
        sectionNumber: "",
        courseNumber: ""
    });
    const [sections, setSections] = useState([]); // State to hold sections data
    const [evaluations, setEvaluations] = useState([]); // State to hold sections data

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

    const handleRequest = (courseNumber, sectionNumber) => async (event) => {
        console.log("handleRequest called with:", courseNumber, sectionNumber);
        try {
            const response = await axios.get(`http://localhost:8080/evaluations/findSpecifics/${state.degreeId}/${courseNumber}/${sectionNumber}`);
            // Directly set the evaluations to the new data from response
            setEvaluations(response.data);
        } catch (error) {
            console.error('Error fetching evaluations:', error);
        }
    };


    const handleEvaluationSubmit = async (event) => {
        event.preventDefault();
        try {
            const evaluationData = {
                degreeId: state.degreeId,
                sectionNumber: state.sectionNumber,
                courseNumber: state.courseNumber,
                objectiveCode: state.objectiveCode,
                method: state.method,
                levelACount: state.levelACount,
                levelBCount: state.levelBCount,
                levelCCount: state.levelCCount,
                levelFCount: state.levelFCount,
                improvementSuggestion: state.improvementSuggestion
            };
            await axios.post(`http://localhost:8080/evaluations/`, evaluationData);
        } catch (error) {
        }
    };

    const deleteEvaluation = async (evaluationId) => {
        try {
            const response = await axios.delete(`http://localhost:8080/evaluations/${evaluationId}`);
            console.log('Delete successful', response.data);
            setEvaluations(prevEvaluations => prevEvaluations.filter(e => e.evaluationId !== evaluationId));
        } catch (error) {
            console.error('Failed to delete evaluation:', error);
        }
    };

    return (
        <div>
            <h1>Enter Evaluation</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="degreeId">Degree ID: </label>
                <input
                    type="text"
                    id="degreeId"
                    value={state.degreeId}
                    onChange={handleChange}
                />
                <label htmlFor="semester">Semester: </label>

                <input
                    type="text"
                    id="semester"
                    value={state.semester}
                    onChange={handleChange}
                />
                <label htmlFor="instructorId">Instructor ID: </label>

                <input
                    type="text"
                    id="instructorId"
                    value={state.instructorId}
                    onChange={handleChange}
                />
                <button type="submit">Request Data</button>
            </form>
            <div>
                {sections.map((section, index) => (
                    <div key={index}>
                        <div className='flex'>
                            <p>Section Number: {section.sectionNumber}</p>
                            <p>Course Number: {section.courseNumber}</p>
                            <p>Semester: {section.semester}</p>
                            <p>Year: {section.year}</p>
                            <p>Enrolled Students: {section.enrolledStudents}</p>
                            <button onClick={handleRequest(section.courseNumber, section.sectionNumber)}>Request Evaluations</button>
                        </div>
                    </div>
                ))}
            </div>
            <form onSubmit={handleEvaluationSubmit}>
                <label htmlFor="objectiveCode">Objective Code: </label>
                <input
                    type="text"
                    id="objectiveCode"
                    value={state.objectiveCode}
                    onChange={handleChange}
                />
                <label htmlFor="method">Method: </label>
                <input
                    type="text"
                    id="method"
                    value={state.method}
                    onChange={handleChange}
                />
                <label htmlFor="levelACount">Level A Count: </label>
                <input
                    type="number"
                    id="levelACount"
                    value={state.levelACount}
                    onChange={handleChange}
                />
                <label htmlFor="levelBCount">Level B Count: </label>
                <input
                    type="number"
                    id="levelBCount"
                    value={state.levelBCount}
                    onChange={handleChange}
                />
                <label htmlFor="levelCCount">Level C Count: </label>
                <input
                    type="number"
                    id="levelCCount"
                    value={state.levelCCount}
                    onChange={handleChange}
                />
                <label htmlFor="levelFCount">Level F Count: </label>
                <input
                    type="number"
                    id="levelFCount"
                    value={state.levelFCount}
                    onChange={handleChange}
                />
                <label htmlFor="improvementSuggestion">Improved Suggestions: </label>
                <input
                    type="text"
                    id="improvementSuggestion"
                    value={state.improvementSuggestion}
                    onChange={handleChange}
                />
                <label htmlFor="degreeId">Degree ID: </label>
                <input
                    type="text"
                    id="degreeId"
                    value={state.degreeId}
                    onChange={handleChange}
                />
                <label htmlFor="sectionNumber">Section Number: </label>
                <input
                    type="text"
                    id="sectionNumber"
                    value={state.sectionNumber}
                    onChange={handleChange}
                />
                <label htmlFor="courseNumber">Course Number: </label>
                <input
                    type="text"
                    id="courseNumber"
                    value={state.courseNumber}
                    onChange={handleChange}
                />
                <button type="submit">Create Evaluation</button>
            </form>
            {evaluations.map((evaluation, index) => (
                <div key={index}>
                    <p>Evaluation ID: {evaluation.evaluationId}</p>
                    <p>Degree ID: {evaluation.degreeId}</p>
                    <p>Course Number: {evaluation.courseNumber}</p>
                    <p>Section Number: {evaluation.sectionNumber}</p>
                    <p>Objective Code: {evaluation.objectiveCode}</p>
                    <p>Method: {evaluation.method}</p>
                    <p>Level A Count: {evaluation.levelACount}</p>
                    <p>Level B Count: {evaluation.levelBCount}</p>
                    <p>Level C Count: {evaluation.levelCCount}</p>
                    <p>Level F Count: {evaluation.levelFCount}</p>
                    <p>Improved Suggestions: {evaluation.improvementSuggestion}</p>
                    <button onClick={() => deleteEvaluation(evaluation.evaluationId)}>Delete this Evaluation</button>
                </div>
            ))}

        </div>
    );
}

export default Evaluation;
