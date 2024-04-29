// import React, { useState } from 'react';
// import axios from 'axios';
//
// function Degree() {
//     const [state, setState] = useState({
//         name: '',
//         level: ''
//     });
//     const [message, setMessage] = useState({ text: '', type: '' }); // Added for feedback message
//
//     const handleChange = (event) => {
//         const { id, value } = event.target;
//         setState(prevState => ({
//             ...prevState,
//             [id.toLowerCase()]: value
//         }));
//     };
//
//     const handleSubmit = async (event) => {
//         event.preventDefault(); // Prevents the default form submission behavior
//         try {
//             await axios.post(`http://localhost:8080/degrees/create`, {
//                 name: state.name,
//                 level: state.level
//             });
//             setMessage({ text: 'Submission successful!', type: 'success' }); // Set success message
//             setState({ name: '', level: '' }); // Optionally reset form fields
//         } catch (error) {
//             setMessage({ text: 'Failed to submit. Please try again.', type: 'error' }); // Set error message
//         }
//     };
//
//     return (
//         <div>
//             <h1>Degree</h1>
//             <form onSubmit={handleSubmit}>
//                 <label htmlFor="Name">Name</label>
//                 <div>
//                     <input
//                         type="text"
//                         id="Name"
//                         value={state.name}
//                         onChange={handleChange}
//                     />
//                 </div>
//                 <label htmlFor="Level">Level</label>
//                 <div>
//                     <input
//                         type="text"
//                         id="Level"
//                         value={state.level}
//                         onChange={handleChange}
//                     />
//                 </div>
//
//                 <button type="submit">Submit</button>
//             </form>
//             {message.text && <div className={message.type === 'success' ? 'success-message' : 'error-message'}>
//                 {message.text}
//             </div>}
//         </div>
//     );
// }
//
// export default Degree;
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Degree() {
    const [degrees, setDegrees] = useState([]);
    const [state, setState] = useState({ name: '', level: '' });
    const [message, setMessage] = useState({ text: '', type: '' });

    useEffect(() => {
        fetchDegrees();
    }, []);

    const fetchDegrees = async () => {
        try {
            const response = await axios.get('http://localhost:8080/degrees/all');
            setDegrees(response.data);
        } catch (error) {
            console.error('Failed to fetch degrees', error);
            setMessage({ text: 'Error fetching degrees. Please try again.', type: 'error' });
        }
    };

    const handleChange = (event) => {
        const { id, value } = event.target;
        setState(prevState => ({
            ...prevState,
            [id.toLowerCase()]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post('http://localhost:8080/degrees/create', state);
            setMessage({ text: 'Submission successful!', type: 'success' });
            setState({ name: '', level: '' });
            fetchDegrees();  // Refresh list after adding
        } catch (error) {
            setMessage({ text: 'Failed to submit. Please try again.', type: 'error' });
        }
    };

    const handleDelete = async (degreeID) => {
        try {
            await axios.delete(`http://localhost:8080/degrees/delete/${degreeID}`);
            fetchDegrees();  // Refresh list after deletion
        } catch (error) {
            console.error('Failed to delete degree', error);
        }
    };

    return (
        <div>
            <h1>Degree</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="Name">Name</label>
                <input type="text" id="Name" value={state.name} onChange={handleChange} />
                <label htmlFor="Level">Level</label>
                <input type="text" id="Level" value={state.level} onChange={handleChange} />
                <button type="submit">Submit</button>
            </form>
            {message.text && <div className={message.type === 'success' ? 'success-message' : 'error-message'}>
                {message.text}
            </div>}
            <h2>All Degrees</h2>
            <ul>
                {degrees.map(degree => (
                    <li key={degree.degreeID}>
                        ID: {degree.degreeID}, {degree.name} - {degree.level}
                        <button onClick={() => handleDelete(degree.degreeID)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Degree;
