import React from 'react';

const BookingList = ({ bookings }) => {
    return (
        <div>
            <ul>
                {bookings.map((booking) => (
                    <li key={booking.id}>
                        {booking.customer_name} - {booking.address} -{' '}
                        {new Date(booking.date_time).toLocaleString()}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BookingList;
