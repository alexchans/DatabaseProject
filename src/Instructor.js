import React from 'react';

class Instructor extends React.Component {
    render() {
        return (
            <div>
                <h1>Instructor</h1>
                <label htmlFor="Name">Name</label>
                <div>
                    <input
                        type="text"
                        id="Name"
                    />
                </div>
                <button type="submit">Submit</button>
            </div>
        );
    }
}

export default Instructor;