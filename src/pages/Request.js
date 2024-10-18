//src/pages/Request.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Dropdown from './Dropdown';

const Request = () => {
    const [date, setDate] = useState('');
    const [cost, setCost] = useState('');
    const [name, setName] = useState('');
    const [department, setDepartment] = useState('');
    const [description, setDescription] = useState('');
    const [is_recurring_expense, setIsRecurring] = useState('0');


    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Form Submitted:", { date, cost, department, name, description, is_recurring_expense });
        axios.post('http://localhost:5000/api/add-transaction', { date, amount: cost, department, name, description, is_recurring_expense })
            .then(response => {
                console.log('Transaction added:', response.data);
                alert('Transaction submitted successfully!');

                // Clear the form fields
            setDate('');
            setCost('');
            setName('');
            setDepartment('');
            setDescription('');
            setIsRecurring('0'); // or false if using a boolean
            })
            .catch(error => console.error('Error adding transaction:', error));
    };

    const handleCheckboxChange = (event) => {
        setIsRecurring(event.target.checked ? '1' : '0'); // Use '0' or '1' as strings
    };

    const departments = [
        "Adult Services",
        "AV",
        "Chester",
        "Circulation",
        "Communications",
        "HBB",
        "IT Needs",
        "Passport",
        "South End",
        "Weed",
        "Youth"
    ];

    return (
        <div>
            <h4>
                Enter info to log purchase
            </h4>
            <form onSubmit={handleSubmit}>
                <label>
                    Date of Request:
                    <input
                        type="text"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
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
                <Dropdown
                label="Select a Department"
                options={departments}
                value={department}
                onChange={setDepartment}
                placeholder="Choose a department"
                />

                <br />
                <label>
                    Employee Name:
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </label>
                <br />
                <label>
                    Description:
                    <input
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </label>
                <br />
                <label>
                    Recurring Expense:
                    <input
                        type="checkbox"
                        checked={is_recurring_expense === '1'}
                        onChange={handleCheckboxChange}
                    />
                </label>
                <br />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default Request;