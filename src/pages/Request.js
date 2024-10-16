import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Request = () => {
    const [name, setName] = useState('');
    const [department, setDepartment] = useState('');
    const [cost, setCost] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        alert(`Submitted: Name - ${name}, Department - ${department}, Cost - ${cost}`);
    };

    return (
        <div>
            <h4>
                Enter patron name, their department, and cost of request.
                Description is optional.
            </h4>
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </label>
                <br />
                <label>
                    Department:
                    <input
                        type="text"
                        value={department}
                        onChange={(e) => setDepartment(e.target.value)}
                    />
                </label>
                <br />
                <label>
                    Cost of Request:
                    <input
                        type="text"
                        value={cost}
                        onChange={(e) => setCost(e.target.value)}
                    />
                </label>
                <br />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default Request;