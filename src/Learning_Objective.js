import React from 'react';

class Learning_Objective extends React.Component {
    render() {
        return (
            <div>
                <h1>Learning Objective</h1>
                <label htmlFor="ObjectiveCode">Objective Code</label>
                <div>
                    <input
                        type="text"
                        id="ObjectiveCode"
                    />
                </div>
                <label htmlFor="Title">Title</label>
                <div>
                    <input
                        type="text"
                        id="Title"
                    />
                </div>
                <label htmlFor="Description">Description</label>
                <div>
                    <input
                        type="text"
                        id="Description"
                    />
                </div>

                <button type="submit">Submit</button>
            </div>
        );
    }
}

export default Learning_Objective;