import React from 'react';

const ServiceList = ({ services }) => {
    return (
        <div>
            <ul>
                {services.map((service) => (
                    <li key={service.id}>{service.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default ServiceList;
