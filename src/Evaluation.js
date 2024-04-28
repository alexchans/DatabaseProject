import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

class EvaluationClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            degreeId: '',
            semester: '',
            instructor: '',
            sections: [],
            courseObjectives: [],
            message: { text: '', type: '' }
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleEditClick = this.handleEditClick.bind(this);
    }

    handleChange(event) {
        const { id, value } = event.target;
        this.setState({ [id]: value });
    }

    handleSubmit(event) {
        event.preventDefault();
        const { degreeId, semester, instructor, courseObjectives } = this.state;

        // Fetch all courseObjectives to store in a list
        // axios.get('http://localhost:8080/courseObjectives/')
        //     .then(response => {
        //         const courseObjectives_buff = response.data;
        //         this.setState({ 
        //             courseObjectives: courseObjectives_buff,
        //             message: { text: "Fetched all courseObjectives: " + courseObjectives[0].courseNumber, type: 'success' }
        //         });
        //     })
        //     .catch(error => {
        //         console.error('Fetching error:', error);
        //         this.setState({
        //             message: { text: "Fetching error:" + error, type: 'error' }
        //         });
        //     });
        axios.get('http://localhost:8080/courseObjectives/')
            .then(response => {
                const courseObjectives_buff = JSON.parse(JSON.stringify(response.data));
                this.setState({ 
                    courseObjectives: courseObjectives_buff,
                }, () => {
                    this.setState({
                        // message: { text: "Fetched all courseObjectives: " + this.state.courseObjectives[0].courseNumber, type: 'success' }
                    });
                });
            })
            .catch(error => {
                console.error('Fetching error:', error);
                this.setState({
                    message: { text: "Fetching error:" + error, type: 'error' }
                });
            });


        axios.post(`http://localhost:8080/Evaluation/${degreeId}/${semester}/${instructor}`)
            .then(response => {
                // Sort the sections by year in descending order
                const sections = response.data.sort((a, b) => b.year - a.year);
    
                this.setState({
                    sections: sections,  // Set the sorted sections to state
                    message: { text: 'Data fetched successfully!', type: 'success' }
                });
                
                // Loop through each section and make a POST request
                sections.forEach(section => {
                    // filter courseObjectives by the right courseNumber of the section
//                     const objectiveCodes = courseObjectives.filter(obj => obj.courseNumber.toString() === section.courseNumber.toString());
//                     this.setState({ 
//                         // message: { text: "typs comp: " + typeof section.courseNumber + typeof courseObjectives[0].CourseNumber, type: 'success' }
//                         message: { text: "objectiveCodes: " + objectiveCodes[0] + objectiveCodes[0], type: 'success' }
//                     });

// // DEBUG: NOT SURE IF FILTER WORKS
//                     console.log('objectiveCodes:', objectiveCodes);
                    // this.setState({ 
                    //     courseObjectives: objectiveCodes,
                    // }, () => {
                    //     this.setState({
                    //         message: { text: "Fetched all courseObjectives: " + this.state.objectiveCodes[0].courseNumber, type: 'success' }
                    //     });
                    // });

                    // this.setState({
                    //     message: { text: "CO:" + courseObjectives, type: 'success' }
                    // });

                    // For each section, loop through each courseObjective to create an Evaluation tuple
                    courseObjectives.forEach(async objectiveCode => {
                        if (objectiveCode.courseNumber !== section.courseNumber) {
                            return;  // Skip this iteration and continue with the next one
                        }
                        
                        const evaluation = {
                            degreeID : degreeId,
                            sectionNumber : section.sectionNumber,
                            courseNumber : section.courseNumber,
                            objectiveCode : objectiveCode,
                            method : null,
                            levelACount : -1,
                            levelBCount : -1,
                            levelCCount : -1,
                            levelFCount : -1,
                            improvementSuggestion : null
                        };

                        axios.post(`http://localhost:8080/Evaluation/`, {
                            degreeID : degreeId,
                            sectionNumber : section.sectionNumber,
                            courseNumber : section.courseNumber,
                            objectiveCode : objectiveCode,
                            method : null,
                            levelACount : -1,
                            levelBCount : -1,
                            levelCCount : -1,
                            levelFCount : -1,
                            improvementSuggestion : null
                    
                    
                        });
                            // .then(response => {
                            //     console.log('Evaluation tuple created successfully:', response.data);
                            //     this.setState({
                            //         // message: { text: 'Evaluation tuple created successfully!', type: 'success' }
                            //     });
                            // })
                            // .catch(error => {
                            //     console.error('Failed to create Evaluation tuple:', error);
                            //     this.setState({
                            //         message: { text: 'Failed to create Evaluation tuple!', type: 'error' }
                            //     });
                            // });
                        // event.preventDefault(); // Prevents the default form submission behavior
                        // try {
                        //     await axios.post(`http://localhost:8080/Evaluation/`, {
                        //         courseNumber: state.courseNumber,
                        //         name: state.name
                        //     });
                        //     setMessage({ text: 'Submission successful!', type: 'success' }); // Set success message
                        //     setState({ courseNumber: '', name: '' }); // Optionally reset form fields
                        // } catch (error) {
                        //     setMessage({ text: 'Failed to submit. Please try again.', type: 'error' }); // Set error message
                        // }
                        

                    });
                });
            })
            .catch(error => {
                this.setState({
                    message: { text: 'Failed to fetch data. Please try again.', type: 'error' }
                });
                console.error('Fetching error:', error);
            });
        this.setState({ buttonClicked: true });
    }

    handleEditClick(sectionId) {
        this.props.navigate(`/edit-evaluation/${sectionId}`);
    }

    render() {
        const { degreeId, semester, instructor, sections, message } = this.state;
        return (
            <div>
                <h1>Enter Evaluation</h1>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="degreeId">Degree ID</label>
                    <input type="text" id="degreeId" value={degreeId} onChange={this.handleChange} />
                    <label htmlFor="semester">Semester</label>
                    <input type="text" id="semester" value={semester} onChange={this.handleChange} />
                    <label htmlFor="instructor">Instructor</label>
                    <input type="text" id="instructor" value={instructor} onChange={this.handleChange} />
                    <button type="submit">Fetch Sections</button>
                </form>
                {message.text && (
                    <div className={message.type}>{message.text}</div>
                )}
                <h2>Sections:</h2>
                {this.state.courseObjectives.map((section, index) => (
                    <div key={index}>
                        <p>{section.courseNumber} {section.objectiveCode}</p>
                    </div>
                ))}
                {sections.map((section, index) => (
                    <div key={index}>
                        <p>{semester} {section.year} - {section.courseNumber} {section.sectionNumber}</p>
                        <button onClick={() => this.handleEditClick(section.id)}>Edit</button>
                    </div>
                ))}
            </div>
        );
    }
}

function Evaluation() {
    const navigate = useNavigate();
    return <EvaluationClass navigate={navigate} />;
}

export default Evaluation;
