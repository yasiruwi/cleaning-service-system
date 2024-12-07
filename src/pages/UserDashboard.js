import React, { useState, useEffect } from 'react';
import api from '../api';
import BookingList from '../components/BookingList';

const UserDashboard = ({ token }) => {
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        const fetchBookings = async () => {
            const response = await api.get('/bookings', {
                headers: { Authorization: `Bearer ${token}` },
            });
            setBookings(response.data);
        };

        fetchBookings();
    }, [token]);

    return (
        <div>
            <h1>Your Bookings</h1>
            <BookingList bookings={bookings} />
        </div>
    );
};

export default UserDashboard;
