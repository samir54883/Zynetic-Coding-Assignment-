import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    flex: 1;
    width: auto;
    padding: 1.35rem;
    backdrop-filter: blur(20px);
    background-image: linear-gradient(
            120deg,
            ${({ theme }) => theme.glassStart},
            ${({ theme }) => theme.glassEnd}
    );
    background-size: 30px;
    border-radius: 12px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    color: ${({ theme }) => theme.text};
`;

const ForecastList = styled.div`
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    margin-top: 1rem;
    flex-grow: 1;
    gap: 0.75rem;
`;

const ForecastItem = styled.div`
    text-align: center;
    border: 2px solid ${({ theme }) => theme.glassBorder};
    width: 15%;
    border-radius: 12px;
    padding: 0.5rem;
    color: ${({ theme }) => theme.text};
    transition: transform 0.3s ease; /* Smooth transition */

    &:hover {
        transform: scale(1.05); /* Slight scale on hover */
    }

    @media (max-width: 768px) {
        width: 30%;
    }

    @media (max-width: 480px) {
        width: 45%;
    }
`;

const ForecastCard = ({ forecast }) => {
    return (
        <Container>
            <h3 style={{ textAlign: 'center' }}>5-Day Forecast</h3>
            <ForecastList>
                {forecast.map((item, index) => (
                    <ForecastItem key={index}>
                        <h4>{new Date(item.dt_txt).toLocaleDateString()}</h4>
                        <img
                            src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                            alt={item.weather[0].description}
                        />
                        <p>{item.main.temp}°C</p>
                        <p>{item.weather[0].main}</p>
                    </ForecastItem>
                ))}
            </ForecastList>
        </Container>
    );
};

export default ForecastCard;
