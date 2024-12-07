import React, { useState, useEffect } from 'react';
import api from '../api';
import './BookingForm.css';

const BookingForm = ({ token, bookingToEdit = null, onSubmit }) => {
    const [formData, setFormData] = useState({
        customer_name: '',
        address: '',
        date_time: '',
        service_id: '',
    });
    const [services, setServices] = useState([]);

    // Populate the form with existing booking data (if editing)
    useEffect(() => {
        if (bookingToEdit) {
            setFormData({
                customer_name: bookingToEdit.customer_name,
                address: bookingToEdit.address,
                date_time: bookingToEdit.date_time,
                service_id: bookingToEdit.service_id,
            });
        }
    }, [bookingToEdit]);

    // Fetch available services from the backend
    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await api.get('/services', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setServices(response.data);
            } catch (error) {
                console.error('Error fetching services', error);
            }
        };
        fetchServices();
    }, [token]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (bookingToEdit) {
                // Update an existing booking
                await api.put(`/bookings/${bookingToEdit.id}`, formData, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                alert('Booking updated successfully!');
            } else {
                // Create a new booking
                await api.post('/bookings', formData, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                alert('Booking created successfully!');
            }
            onSubmit(); // Callback to refresh the parent component
        } catch (error) {
            console.error('Error saving booking', error);
            alert('Failed to save the booking.');
        }
    };

    return (
        <form className="booking-form" onSubmit={handleSubmit}>
            <h2>{bookingToEdit ? 'Edit Booking' : 'New Booking'}</h2>

            <label>
                Customer Name:
                <input
                    type="text"
                    name="customer_name"
                    value={formData.customer_name}
                    onChange={handleChange}
                    required
                />
            </label>

            <label>
                Address:
                <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                />
            </label>

            <label>
                Date and Time:
                <input
                    type="datetime-local"
                    name="date_time"
                    value={formData.date_time}
                    onChange={handleChange}
                    required
                />
            </label>

            <label>
                Service Type:
                <select
                    name="service_id"
                    value={formData.service_id}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select a service</option>
                    {services.map((service) => (
                        <option key={service.id} value={service.id}>
                            {service.name}
                        </option>
                    ))}
                </select>
            </label>

            <button type="submit">{bookingToEdit ? 'Update Booking' : 'Create Booking'}</button>
        </form>
    );
};

export default BookingForm;
