import { useState } from 'react';

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

export const useWeather = () => {
    const [weatherData, setWeatherData] = useState(null);
    const [forecastData, setForecastData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const fetchWeather = async (city) => {
        setLoading(true);
        setError('');
        setWeatherData(null);
        setForecastData([]);

        try {
            // here we are  Fetching current weather
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
            );

            if (!response.ok) {
                const errorBody = await response.json();
                handleHttpError(response.status, errorBody.message || 'Weather data fetch error');
                return;
            }

            const data = await response.json();
            setWeatherData(data);

            //here we are Fetching 5-day forecast
            const forecastRes = await fetch(
                `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
            );

            if (!forecastRes.ok) {
                const errorBody = await forecastRes.json();
                handleHttpError(forecastRes.status, errorBody.message || 'Forecast fetch error');
                return;
            }

            const forecastJson = await forecastRes.json();
            const dailyForecast = forecastJson.list.filter((item) =>
                item.dt_txt.includes('12:00:00')
            );
            setForecastData(dailyForecast);
        } catch (err) {
            if (err.name === 'TypeError') {
                setError('Network error.Take a look at your internet connection.');
            } else {
                setError(err.message || 'Unexpected error occurred.');
            }
        } finally {
            setLoading(false);
        }
    };
// detailed error handling code for better catching the errors
    const handleHttpError = (status, message) => {
        switch (status) {
            case 401:
                setError('Invalid API key. Please check your credetials.');
                break;
            case 404:
                setError('City not found. enter a valid city.');
                break;
            case 429:
                setError('Rate limit exceeded. try again later.');
                break;
            case 500:
            case 502:
            case 503:
                setError('Server error. Please try again later.');
                break;
            default:
                setError(message || 'An unexpected API error occurred.');
                break;
        }
    };

    return { weatherData, forecastData, loading, error, fetchWeather };
};
