import React from 'react';
import styled from 'styled-components';

const Card = styled.div`
    background-color: transparent;
    backdrop-filter: blur(20px);
    background-image: linear-gradient(
            120deg,
            ${({ theme }) => theme.glassStart},
            ${({ theme }) => theme.glassEnd}
    );
    background-size: 30px;
    padding: 1.45rem;
    border-radius: 12px;
    width: 30%;
    min-width: 300px;
    text-align: center;
    color: ${({ theme }) => theme.text};

    @media (max-width: 768px) {
        width: 80%;
    }
`;

const WeatherCard = ({ data }) => {
    if (!data) return null;

    return (
        <Card>
            <h2>{data.name}</h2>
            <img
                src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
                alt={data.weather[0].description}
            />
            <h3>{data.main.temp} °C</h3>
            <p>Weather Condition: {data.weather[0].main}</p>
            <p>Humidity: {data.main.humidity}%</p>
            <p>Wind Speed: {data.wind.speed} km/h</p>
        </Card>
    );
};

export default WeatherCard;
