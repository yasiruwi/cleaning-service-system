import React, { useState } from 'react';
import api from '../api';

const ServiceForm = ({ token, setServices }) => {
    const [name, setName] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post(
                '/services',
                { name },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setServices((prev) => [...prev, response.data]);
            setName('');
        } catch (error) {
            alert('Error adding service!');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Service Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <button type="submit">Add Service</button>
        </form>
    );
};

export default ServiceForm;
