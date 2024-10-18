import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Dropdown from './Dropdown';
import './Database.css';

const Database = () => {
    const [option, setOption] = useState('');
    const [rows, setRows] = useState([]);
    const [name, setName] = useState('');
    const [department, setDepartment] = useState('');
    const [is_recurring_expense, setIsRecurring] = useState('0');

    // Fetch all data initially
    useEffect(() => {
        axios.get('http://localhost:5000/api/rows')
            .then(response => setRows(response.data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    // Handle form submission and apply filters
    const handleSubmit = (event) => {
        event.preventDefault();
        const params = {};

        if (option === 'By name' && name) {
            params.name = name;
        }
        if (option === 'By department' && department) {
            params.department = department;
        }
        if (option === 'Recurring') {
            params.is_recurring_expense = is_recurring_expense === '1' ? 'true' : 'false';
        }

        axios.get('http://localhost:5000/api/filtered-rows', { params })
            .then(response => setRows(response.data))
            .catch(error => console.error('Error fetching filtered data:', error));
    };

    // Handle checkbox change for recurring expense
    const handleCheckboxChange = (event) => {
        setIsRecurring(event.target.checked ? '1' : '0');
    };

    // Department options
    const departments = [
        "Adult Services", "AV", "Chester", "Circulation", "Communications",
        "HBB", "IT Needs", "Passport", "South End", "Weed", "Youth"
    ];

    // Search criteria options
    const search_options = ["By name", "By department", "Recurring"];

    return (
        <div>
            <h4>Search through expenses database:</h4>
            <form onSubmit={handleSubmit}>
                <Dropdown
                    label="Select search criteria:"
                    options={search_options}
                    value={option}
                    onChange={setOption}
                    placeholder="Select"
                />
                <br />

                {option === 'By name' && (
                    <label>
                        Employee Name:
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </label>
                )}
                {option === 'By department' && (
                    <Dropdown
                        label="Select a Department"
                        options={departments}
                        value={department}
                        onChange={setDepartment}
                        placeholder="Choose a department"
                    />
                )}
                {option === 'Recurring' && (
                    <label>
                        Recurring Expense:
                        <input
                            type="checkbox"
                            checked={is_recurring_expense === '1'}
                            onChange={handleCheckboxChange}
                        />
                    </label>
                )}

                <br />
                <button type="submit">Search</button>
            </form>

            <table>
                <thead>
                    <tr>
                        <th>Transaction ID</th>
                        <th>Date</th>
                        <th>Amount</th>
                        <th>Department</th>
                        <th>Description</th>
                        <th>Recurring Expense</th>
                        <th>Name</th>
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row, index) => (
                        <tr key={index}>
                            <td>{row.transaction_id}</td>
                            <td>{row.date}</td>
                            <td>{row.amount}</td>
                            <td>{row.department}</td>
                            <td>{row.description}</td>
                            <td>{row.is_recurring_expense}</td>
                            <td>{row.name}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Database;