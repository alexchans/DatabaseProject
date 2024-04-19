import React from 'react';

class Degree extends React.Component {
    render() {
        return (
            <div>
                <h1>Degree</h1>
                <label htmlFor="Name">Name</label>
                <div>
                    <input
                        type="text"
                        id="Name"
                    />
                </div>
                <label htmlFor="Level">Level</label>
                <div>
                    <input
                        type="text"
                        id="Level"
                    />
                </div>

                <button type="submit">Submit</button>
            </div>
        );
    }
}

export default Degree;