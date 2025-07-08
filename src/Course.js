// import React, { useState } from 'react';
// import axios from 'axios';
// perez test
// function Course() {
//     const [state, setState] = useState({
//         courseNumber: '',
//         name: ''
//     });
//     const [message, setMessage] = useState({ text: '', type: '' }); // Added for feedback message
//
//     const handleChange = (event) => {
//         const { id, value } = event.target;
//         setState(prevState => ({
//             ...prevState,
//             [id]: value
//         }));
//     };
//
//     const handleSubmit = async (event) => {
//         event.preventDefault(); // Prevents the default form submission behavior
//         try {
//             await axios.post(`http://localhost:8080/courses/`, {
//                 courseNumber: state.courseNumber,
//                 name: state.name
//             });
//             setMessage({ text: 'Submission successful!', type: 'success' }); // Set success message
//             setState({ courseNumber: '', name: '' }); // Optionally reset form fields
//         } catch (error) {
//             setMessage({ text: 'Failed to submit. Please try again.', type: 'error' }); // Set error message
//         }
//     };
//
//     return (
//         <div>
//             <h1>Course</h1>
//             <form onSubmit={handleSubmit}>
//                 <label htmlFor="courseNumber">Course Number</label>
//                 <div>
//                     <input
//                         type="text"
//                         id="courseNumber"
//                         value={state.courseNumber}
//                         onChange={handleChange}
//                     />
//                 </div>
//                 <label htmlFor="name">Name</label>
//                 <div>
//                     <input
//                         type="text"
//                         id="name"
//                         value={state.name}
//                         onChange={handleChange}
//                     />
//                 </div>
//                 <button type="submit">Submit</button>
//             </form>
//             {message.text && <div className={message.type === 'success' ? 'success-message' : 'error-message'}>
//                 {message.text}
//             </div>}
//         </div>
//     );
// }
//
// export default Course;


import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Course() {
    const [courses, setCourses] = useState([]);
    const [state, setState] = useState({ courseNumber: '', name: '' });
    const [message, setMessage] = useState({ text: '', type: '' });

    useEffect(() => {
        fetchCourses();
    }, []);

    const fetchCourses = async () => {
        try {
            const response = await axios.get('http://localhost:8080/courses/');
            setCourses(response.data);
        } catch (error) {
            console.error('Failed to fetch courses', error);
        }
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
            await axios.post('http://localhost:8080/courses/', {
                courseNumber: state.courseNumber,
                name: state.name
            });
            setMessage({ text: 'Submission successful!', type: 'success' });
            setState({ courseNumber: '', name: '' }); // Optionally reset form fields
            fetchCourses(); // Refresh list after adding
        } catch (error) {
            setMessage({ text: 'Failed to submit. Please try again.', type: 'error' });
        }
    };

    const handleDelete = async (courseNumber) => {
        try {
            await axios.delete(`http://localhost:8080/courses/${courseNumber}`);
            fetchCourses(); // Refresh list after deletion
        } catch (error) {
            console.error('Failed to delete course', error);
        }
    };

    return (
        <div>
            <h1>Course</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="courseNumber">Course Number</label>
                <input type="text" id="courseNumber" value={state.courseNumber} onChange={handleChange} />
                <label htmlFor="name">Name</label>
                <input type="text" id="name" value={state.name} onChange={handleChange} />
                <button type="submit">Submit</button>
            </form>
            {message.text && (
                <div className={message.type === 'success' ? 'success-message' : 'error-message'}>
                    {message.text}
                </div>
            )}
            <h2>All Courses</h2>
            <ul>
                {courses.map(course => (
                    <li key={course.courseNumber}>
                        {course.courseNumber} - {course.name}
                        <button onClick={() => handleDelete(course.courseNumber)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Course;
