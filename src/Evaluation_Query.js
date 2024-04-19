import React from 'react';

class Evaluation_Query extends React.Component {
    render() {
        return (
            <div>
                <h1>Evaluation Query</h1>
                <label htmlFor="Semester">Semester</label>
                <div>
                    <input
                        type="text"
                        id="Semester"
                    />
                </div>
                <label htmlFor="Percentage">Enter a Percentage with number, i.e. enter 1 for 1 percent</label>
                <div>
                    <input
                        type="text"
                        id="Percentage"
                    />
                </div>
                <button type="submit">Request Data</button>
            </div>
        );
    }
}

export default Evaluation_Query;