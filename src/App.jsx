import React, { useEffect, useState } from 'react';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';

import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import Loader from './components/Loader';
import ErrorMessage from './components/ErrorMessage';
import ForecastCard from './components/ForecastCard';
import LightCloud from './assets/LIGHT-CLOUD.png';
import DarkCloud from './assets/DARK-CLOUD.png';

import { useWeather } from './hooks/useWeather';
import { lightTheme, darkTheme } from './styles/theme';

const GlobalStyle = createGlobalStyle`
    @font-face {
        font-family: 'TAN-NIMBUS';
        src: url('/src/assets/TAN-NIMBUS.otf') format('opentype');
        font-weight: normal;
        font-style: normal;
    }

    body {
        margin: 0;
        padding: 0;
        background-color: ${({ theme }) => theme.body};
        color: ${({ theme }) => theme.text};
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        transition: background-color 0.3s ease, color 0.3s ease;
    }
`;

const HistoryList = styled.ul`
    display: flex;
    justify-content: center;
    gap: 1rem;
    flex-wrap: wrap;
    list-style: none;
    padding: 0;
    margin-top: 1rem;
`;
const GridBackground = styled.div`
    position: absolute;
    inset: 0;
    z-index: -10;
    height: 100%;
    width: 100%;
    background-color: ${({ theme }) => theme.body};
    background-image: ${({ theme }) =>
            theme.name === 'light'
                    ? `linear-gradient(to right, #4444440A 1px, transparent 1px),
         linear-gradient(to bottom, #4444440A 1px, transparent 1px)`
                    : `linear-gradient(to right, #8888880a 1px, transparent 1px),
         linear-gradient(to bottom, #8888880a 1px, transparent 1px)`};
    background-size: 14px 24px;
    pointer-events: none;

    &::after {
        content: '';
        position: absolute;
        inset: 0;
        background: linear-gradient(to bottom, rgba(0, 0, 0, 0) 60%, ${({ theme }) => theme.body} 100%);
    }
`;

const HistoryItem = styled.li`
    background: ${({ theme }) => theme.card};
    padding: 0.5rem 1rem;
    border-radius: 6px;
    border: 1px solid ${({ theme }) => theme.border};
    cursor: pointer;
    &:hover {
        background: ${({ theme }) => theme.border};
    }
`;

const Container = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    padding: 1rem;
`;

const Title = styled.h1`
    text-align: center;
    margin-top: 1.5rem;
    font-family: 'TAN-NIMBUS', sans-serif;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
`;


const CardsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-top: 2rem;

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: flex-start;
    justify-content: center;
  }
`;

function App() {
    const { weatherData, forecastData, loading, error, fetchWeather } = useWeather();

    const [history, setHistory] = useState([]);
    const [lastCity, setLastCity] = useState('');
    const [theme, setTheme] = useState('light');

    // Load theme and history from localStorage on mount
    useEffect(() => {
        const storedHistory = JSON.parse(localStorage.getItem('weather_history')) || [];
        setHistory(storedHistory);

        const storedTheme = localStorage.getItem('theme') || 'light';
        setTheme(storedTheme);
    }, []);

    const handleSearch = (city) => {
        fetchWeather(city);
        setLastCity(city);

        setHistory((prev) => {
            const updated = [city, ...prev.filter((c) => c.toLowerCase() !== city.toLowerCase())].slice(0, 5);
            localStorage.setItem('weather_history', JSON.stringify(updated));
            return updated;
        });
    };
    const formatCityName = (name) =>
        name
            .split(' ')
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(' ');

    const toggleTheme = () => {
        const next = theme === 'light' ? 'dark' : 'light';
        setTheme(next);
        localStorage.setItem('theme', next);
    };

    return (
        <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
            <GlobalStyle />
            <GridBackground /> {/* ← Background Layer */}
            <Container>
                <Title>
                    <img
                        src={theme === 'light' ? LightCloud : DarkCloud}
                        alt="Cloud Icon"
                        style={{ width: '40px', verticalAlign: 'middle', marginRight: '0.5rem' }}
                    />
                    Weather Dashboard
                </Title>

                <SearchBar
                    onSearch={handleSearch}
                    onRefresh={fetchWeather}
                    lastCity={lastCity}
                    onToggleTheme={toggleTheme}
                    themeMode={theme}
                />

                {history.length > 0 && (
                    <HistoryList>
                        {history.map((city, index) => (
                            <HistoryItem key={index} onClick={() => handleSearch(city)}>
                                {formatCityName(city)}
                            </HistoryItem>
                        ))}

                    </HistoryList>
                )}

                {loading && <Loader />}
                {error && <ErrorMessage message={error} />}

                {(weatherData || forecastData.length > 0) && (
                    <CardsWrapper>
                        {weatherData && <WeatherCard data={weatherData} />}
                        {forecastData.length > 0 && <ForecastCard forecast={forecastData} />}
                    </CardsWrapper>
                )}
            </Container>
        </ThemeProvider>
    );
}

export default App;
