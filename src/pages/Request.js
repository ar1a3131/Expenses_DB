import React, { useState } from 'react';
import axios from 'axios';
import Dropdown from './Dropdown';

const Request = () => {
    const [month, setMonth] = useState('');
    const [day, setDay] = useState('');
    const [year, setYear] = useState('');
    const [cost, setCost] = useState('');
    const [name, setName] = useState('');
    const [department, setDepartment] = useState('');
    const [description, setDescription] = useState('');
    const [is_recurring_expense, setIsRecurring] = useState(0);

    // Handle form submission
    const handleSubmit = (event) => {
        event.preventDefault();

        // Construct the date in 'MM/DD/YYYY' format
        const date = `${month}/${day}/${year}`;

        // Validate the date
        if (!month || !day || !year) {
            alert("Please select a valid date.");
            return;
        }

        console.log("Form Submitted:", { date, cost, department, name, description, is_recurring_expense });

        axios.post('http://localhost:5000/api/add-transaction', { date, cost, department, name, description, is_recurring_expense })
            .then(response => {
                console.log('Transaction added:', response.data);
                alert('Transaction submitted successfully!');
                clearForm();
            })
            .catch(error => console.error('Error adding transaction:', error));
    };

    // Clear form after submission
    const clearForm = () => {
        setMonth('');
        setDay('');
        setYear('');
        setCost('');
        setName('');
        setDepartment('');
        setDescription('');
        setIsRecurring(0);
    };

    // Month options
    const months = [
        { value: '01', label: 'January' },
        { value: '02', label: 'February' },
        { value: '03', label: 'March' },
        { value: '04', label: 'April' },
        { value: '05', label: 'May' },
        { value: '06', label: 'June' },
        { value: '07', label: 'July' },
        { value: '08', label: 'August' },
        { value: '09', label: 'September' },
        { value: '10', label: 'October' },
        { value: '11', label: 'November' },
        { value: '12', label: 'December' }
    ];

    // Day options (1-31)
    const days = Array.from({ length: 31 }, (_, i) => ({
        value: String(i + 1).padStart(2, '0'),
        label: String(i + 1)
    }));

    return (
        <div>
            <h4>Enter purchase request details:</h4>
            <form onSubmit={handleSubmit}>
                <div className="date-inputs">
                    <Dropdown
                        label="Month:"
                        options={months}
                        value={month}
                        onChange={setMonth}
                        placeholder="Month"
                    />
                    <Dropdown
                        label="Day:"
                        options={days}
                        value={day}
                        onChange={setDay}
                        placeholder="Day"
                    />
                    <div className="year-input">
                        <label>Year:</label>
                        <input
                            type="text"
                            value={year}
                            onChange={(e) => setYear(e.target.value)}
                            placeholder="YYYY"
                            maxLength="4"
                        />
                    </div>
                </div>
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
                        checked={is_recurring_expense === 1}
                        onChange={(e) => setIsRecurring(e.target.checked ? 1 : 0)}
                    />
                </label>
                <br />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default Request;