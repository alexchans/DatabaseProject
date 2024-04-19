import React from 'react';

class Degree_Query extends React.Component {
    render() {
        return (
            <div>
                <h1>Degree Query</h1>
                <label htmlFor="DegreeID">Degree ID</label>
                <div>
                    <input
                        type="text"
                        id="DegreeID"
                    />
                </div>
                <button type="submit">Request Data</button>
            </div>
        );
    }
}

export default Degree_Query;