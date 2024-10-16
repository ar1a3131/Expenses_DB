// src/pages/Database.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';


const Database = () => {
    const [rows, setRows] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/rows')
            .then(response => setRows(response.data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    return (
        <div>
            <h4>Database Rows:</h4>
            <ul>
                {rows.map((row, index) => (
                    <li key={index}>{JSON.stringify(row)}</li>
                ))}
            </ul>
        </div>
    );
};

export default Database;