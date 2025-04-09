import React from 'react';
import styled from 'styled-components';

// Style for displaying error messages that are meticulously coded
const WeatherErrorBox = styled.div`
    color: red;
    text-align: center;
    margin: 5rem auto;
    font-size: 1.1rem;
    max-width: 500px;
`;

const WeatherErrorMessage = ({ message }) => {
    if (!message) return null;
    return <WeatherErrorBox>{message}</WeatherErrorBox>;
};

export default WeatherErrorMessage;
