import React from 'react';
import '../globals.css';
import WeatherCard from './WeatherCard';
import { FaTemperatureThreeQuarters } from 'react-icons/fa6';
import { FaDroplet } from 'react-icons/fa6';
import { FaWind } from 'react-icons/fa';
import { FaGaugeHigh } from 'react-icons/fa6';
import Sun from '../../../public/svgs/sun';
import Thunder from '../../../public/svgs/thunder';
import Rain from '../../../public/svgs/rain';
import Snow from '../../../public/svgs/snow';
import Mist from '../../../public/svgs/mist';
import ShowerRain from '../../../public/svgs/showerRain';
import BrokenCLouds from '../../../public/svgs/brokenClouds';
import Cloud from '../../../public/svgs/cloud';

interface WeatherProps {
  data: any;
}
const Weather = ({ data }: WeatherProps) => {
  if (!data.weather || data.weather.length === 0) {
    return null; // or you can return a loading indicator or default message
  }
  const weatherCondition = data.weather[0].main;
  let WeatherSVG;

  switch (weatherCondition) {
    case 'Clear':
      WeatherSVG = Sun;
      break;
    case 'Thunderstorm':
      WeatherSVG = Thunder;
      break;
    case 'Rain':
      WeatherSVG = Rain;
      break;
    case 'Snow':
      WeatherSVG = Snow;
      break;
    case 'Mist':
    case 'Smoke':
      WeatherSVG = Mist;
      break;
    case 'Shower Rain':
      WeatherSVG = ShowerRain;
      break;
    case 'Clouds':
      WeatherSVG = BrokenCLouds;
      break;
    case 'Scattered clouds':
      WeatherSVG = Cloud;
      break;
    default:
      WeatherSVG = Cloud;
  }
  const weatherData = [
    {
      title: 'Real Feel',
      degree: `${data.main.feels_like.toFixed(0)}`,
      unit: '°',
      icon: <FaTemperatureThreeQuarters />,
    },
    {
      title: 'Humidity',
      degree: `${data.main.humidity}`,
      unit: '%',
      icon: <FaDroplet />,
    },
    {
      title: 'Wind',
      degree: `${data.wind.speed.toFixed(0)}`,
      unit: 'MPH',
      icon: <FaWind />,
    },
    {
      title: 'Pressure',
      degree: `${data.main.pressure.toFixed(0)}`,
      unit: 'hPa',
      icon: <FaGaugeHigh />,
    },
  ];
  return (
    <div className='mt-2 w-full max-w-3xl px-5 text-white sm:mt-4'>
      <div className='mt-5 flex flex-col items-center justify-center sm:mt-2'>
        <h1 className='text-4xl font-bold'> {data.name}</h1>
      </div>
      <div className='flex flex-col items-center justify-between px-14 sm:-mt-7 sm:grid sm:grid-cols-2'>
        <div className='py-7'>
          <WeatherSVG className='text-[1.6rem]' />
        </div>
        <div className='mt-2 justify-self-end sm:mt-5'>
          <p className='text-5xl font-bold sm:text-6xl'>
            {data.main.temp.toFixed(0)}&#176;
          </p>
        </div>
      </div>
      <div className='mt-3 flex justify-center text-center text-3xl sm:mt-0'>
        <p className='rounded-full bg-neutral-800 p-3 px-6 font-bold'>
          {data.weather[0].main}
        </p>
      </div>
      <div className='mt-7 hidden grid-cols-2 gap-4 sm:mt-4 sm:grid'>
        {weatherData.map((weatherItem, index) => (
          <WeatherCard
            key={index}
            title={weatherItem.title}
            degree={weatherItem.degree}
            unit={weatherItem.unit}
            icon={weatherItem.icon}
          />
        ))}
      </div>
      {/* Mobile */}
      <div className='mt-5 flex flex-wrap justify-center gap-10 text-xl font-semibold sm:mt-5 sm:hidden'>
        <div className='flex items-center gap-1'>
          <FaTemperatureThreeQuarters className='text-[1.7rem]' />
          {data.main.feels_like.toFixed(0)}&#176;
        </div>
        <div className='flex items-center gap-1'>
          <FaDroplet className='text-[1.7rem]' />
          {data.main.humidity} %
        </div>
        <div className='flex items-center gap-1'>
          <FaWind className='text-[1.7rem]' />
          {data.wind.speed.toFixed(0)} MPH
        </div>
      </div>
    </div>
  );
};

export default Weather;
