import React, { useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import './Evaluation.css';

function Evaluation() {
    const [state, setState] = useState({
        degreeId: '',
        semester: '',
        instructorId: '',
        objectiveCode: '',
        method: '',
        levelACount: 0,
        levelBCount: 0,
        levelCCount: 0,
        levelFCount: 0,
        improvementSuggestion: '',
        sectionNumber: "",
        courseNumber: ""
    });
    const [sections, setSections] = useState([]); 
    const [evaluations, setEvaluations] = useState([]); 

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
            setSections(response.data); 
        } catch (error) {
            console.error("Error fetching sections", error);
        }
    };

    const handleRequest = (courseNumber, sectionNumber) => async (event) => {
        console.log("handleRequest called with:", courseNumber, sectionNumber);
        try {
            const response = await axios.get(`http://localhost:8080/evaluations/findSpecifics/${state.degreeId}/${courseNumber}/${sectionNumber}`);
            setEvaluations(response.data);
            // Optionally pre-fill the create form with the selected section info
            setState(prev => ({
                ...prev,
                courseNumber: courseNumber,
                sectionNumber: sectionNumber
            }));
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
            alert("Evaluation created successfully!");
            // Refresh evaluations list if we know the context, or just list all? 
            // Ideally we re-fetch evaluations for this section to show the new one.
        } catch (error) {
            console.error("Error creating evaluation", error);
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
        <div className="evaluation-page">
            <Navbar />
            <div className="evaluation-container">
                <h1 className="page-title">Evaluation Management</h1>
                
                {/* Search Section */}
                <div className="card">
                    <h2 className="section-header">Find Instructor Sections</h2>
                    <form onSubmit={handleSubmit} className="form-grid">
                        <div className="form-group">
                            <label htmlFor="degreeId">Degree ID</label>
                            <input
                                type="text"
                                id="degreeId"
                                value={state.degreeId}
                                onChange={handleChange}
                                placeholder="e.g. CS"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="semester">Semester</label>
                            <input
                                type="text"
                                id="semester"
                                value={state.semester}
                                onChange={handleChange}
                                placeholder="e.g. Fall 2024"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="instructorId">Instructor ID</label>
                            <input
                                type="text"
                                id="instructorId"
                                value={state.instructorId}
                                onChange={handleChange}
                                placeholder="e.g. 12345"
                            />
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn">Request Data</button>
                        </div>
                    </form>
                </div>

                {/* Sections List */}
                {sections.length > 0 && (
                    <div className="card">
                        <h2 className="section-header">Sections Found</h2>
                        <div className="results-grid">
                            {sections.map((section, index) => (
                                <div key={index} className="result-card">
                                    <div className="form-grid" style={{ alignItems: 'center' }}>
                                        <div>
                                            <p><strong>Course:</strong> {section.courseNumber}</p>
                                            <p><strong>Section:</strong> {section.sectionNumber}</p>
                                            <p><strong>Term:</strong> {section.semester} {section.year}</p>
                                            <p><strong>Enrolled:</strong> {section.enrolledStudents}</p>
                                        </div>
                                        <div>
                                            <button 
                                                className="btn btn-sm"
                                                onClick={handleRequest(section.courseNumber, section.sectionNumber)}
                                            >
                                                View/Add Evaluations
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Create Evaluation Form */}
                <div className="card">
                    <h2 className="section-header">Create New Evaluation</h2>
                    <form onSubmit={handleEvaluationSubmit}>
                        <div className="two-col-grid">
                            <div className="form-group">
                                <label htmlFor="courseNumber">Course Number</label>
                                <input type="text" id="courseNumber" value={state.courseNumber} onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="sectionNumber">Section Number</label>
                                <input type="text" id="sectionNumber" value={state.sectionNumber} onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="degreeId">Degree ID</label>
                                <input type="text" id="degreeId" value={state.degreeId} onChange={handleChange} />
                            </div>
                             <div className="form-group">
                                <label htmlFor="objectiveCode">Objective Code</label>
                                <input type="text" id="objectiveCode" value={state.objectiveCode} onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="method">Method</label>
                                <input type="text" id="method" value={state.method} onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="improvementSuggestion">Improvement Suggestion</label>
                                <input type="text" id="improvementSuggestion" value={state.improvementSuggestion} onChange={handleChange} />
                            </div>
                        </div>

                        <h3 style={{marginTop: '1.5rem', marginBottom: '1rem', color: '#666'}}>Grade Dictionary</h3>
                        <div className="form-grid">
                            <div className="form-group">
                                <label htmlFor="levelACount">As</label>
                                <input type="number" id="levelACount" value={state.levelACount} onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="levelBCount">Bs</label>
                                <input type="number" id="levelBCount" value={state.levelBCount} onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="levelCCount">Cs</label>
                                <input type="number" id="levelCCount" value={state.levelCCount} onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="levelFCount">Fs</label>
                                <input type="number" id="levelFCount" value={state.levelFCount} onChange={handleChange} />
                            </div>
                        </div>
                        
                        <div style={{marginTop: '2rem'}}>
                             <button type="submit" className="btn">Create Evaluation</button>
                        </div>
                    </form>
                </div>

                {/* Existing Evaluations List */}
                {evaluations.length > 0 && (
                    <div className="card">
                        <h2 className="section-header">Existing Evaluations</h2>
                        <div className="results-grid">
                            {evaluations.map((evaluation, index) => (
                                <div key={index} className="result-card">
                                    <p><strong>ID:</strong> {evaluation.evaluationId} | <strong>Obj:</strong> {evaluation.objectiveCode}</p>
                                    <p><strong>Method:</strong> {evaluation.method}</p>
                                    <p><strong>Grades:</strong> A:{evaluation.levelACount}, B:{evaluation.levelBCount}, C:{evaluation.levelCCount}, F:{evaluation.levelFCount}</p>
                                    <p><strong>Suggestion:</strong> {evaluation.improvementSuggestion}</p>
                                    <div className="evaluation-actions">
                                        <button className="btn btn-danger btn-sm" onClick={() => deleteEvaluation(evaluation.evaluationId)}>
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Evaluation;
