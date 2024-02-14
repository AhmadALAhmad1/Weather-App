'use client';
import React, { useState } from 'react';
import { IoSearch } from 'react-icons/io5';
import axios from 'axios';
import Weather from './components/Weather';
import Loader from './components/Loader';
import './globals.css';
import WeeklyWeatherCard from './components/DailyWeatherCard';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
interface WeatherData {
  weather: WeatherCondition[];
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
    pressure: number;
  };
  wind: {
    speed: number;
  };
}

interface WeatherCondition {
  main: string;
}

interface ForecastData {
  list: Forecast[];
}

interface Forecast {
  dt_txt: string;
  main: {
    temp: number;
  };
}

interface WeatherState {
  weather: WeatherData;
  forecast?: ForecastData; 
}

export default function Home() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState<WeatherState>({
    weather: {
      weather: [],
      main: {
        temp: 0,
        feels_like: 0,
        humidity: 0,
        pressure: 0,
      },
      wind: {
        speed: 0,
      },
    },
  });
  const [loading, setLoading] = useState(false);

  const apiKey = process.env.NEXT_PUBLIC_WEATHER_KEY;
  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;

  const fetchWeather = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setLoading(true);
    axios
      .get(weatherUrl)
      .then((response) => {
        setWeather({ weather: response.data });
        return axios.get(forecastUrl);
      })
      .then((response) => {
        const filteredForecast = {
          list: response.data.list.slice(0, 6),
        };
        setWeather((prevState) => ({
          ...prevState,
          forecast: filteredForecast,
        }));
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching weather data:', error);
        toast.error("Couldn't find the city. Please try again!", {
          position: 'top-right',
          autoClose: 3000,
          closeOnClick: true,
          draggable: true,
        });

        setLoading(false);
      });
  };

  return (
    <div id=' nc-main' className=' bg-cc min-h-screen pb-2'>
      <div className='bg-animation bg-blue-600/25'>
        <div id='stars'></div>
        <div id='stars2'></div>
      </div>
      <div className='relative top-5 items-center justify-center'>
        <div className='flex flex-col items-center justify-center px-2'>
          <form
            onSubmit={fetchWeather}
            className='flex items-center justify-center rounded-3xl border-2 p-2 px-2 sm:px-4'
          >
            <input
              onChange={(e) => setCity(e.target.value)}
              className='border-none bg-transparent text-lg text-white focus:outline-none sm:text-2xl'
              type='text'
              placeholder='Search city'
            />
            <button
              className='rounded-full bg-cyan-500 p-2 opacity-90 duration-300 hover:scale-105'
              onClick={fetchWeather}
            >
              <IoSearch size={25} className='' />
            </button>
          </form>
          {loading ? (
            <Loader />
          ) : weather ? (
            <>
              <Weather data={weather.weather} />
            </>
          ) : null}
        </div>
        {weather.forecast && (
          <div className='no-scrollbar mx-2 mb-5 mt-6 flex items-center justify-center sm:mb-0 sm:mt-4'>
            <WeeklyWeatherCard data={weather.forecast.list} />
          </div>
        )}
      </div>
    </div>
  );
}
