'use client'
import React from 'react';
import { motion } from 'framer-motion';
import Sun from '../../../public/svgs/sun';
import Thunder from '../../../public/svgs/thunder';
import Rain from '../../../public/svgs/rain';
import Snow from '../../../public/svgs/snow';
import Mist from '../../../public/svgs/mist';
import ShowerRain from '../../../public/svgs/showerRain';
import BrokenClouds from '../../../public/svgs/brokenClouds';
import Cloud from '../../../public/svgs/cloud';

interface Props {
  data: any;
}

const WeeklyWeatherCard: React.FC<Props> = ({ data }) => {
  const formatTime = (timeString: string): string => {
    const date = new Date(timeString);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const period = hours >= 12 ? 'pm' : 'am';
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
    return `${formattedHours}:${minutes < 10 ? '0' : ''}${minutes}${period}`;
  };

  return (
    <div className='no-scrollbar mx-2 flex gap-4 overflow-x-scroll scroll-smooth'>
      {data.map(
        (
          day: {
            weather: { main: any }[];
            dt_txt: string;
            main: {
              temp:
                | string
                | number
                | boolean
                | React.ReactElement<
                    any,
                    string | React.JSXElementConstructor<any>
                  >
                | Iterable<React.ReactNode>
                | React.ReactPortal
                | React.PromiseLikeOfReactNode
                | null
                | undefined;
            };
          },
          index: React.Key | null | undefined
        ) => {
          let WeatherSVG;
          let animationProps = {
            initial: { opacity: 0, y: -20 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.5 },
          };

          switch (day.weather[0].main) {
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
              WeatherSVG = BrokenClouds;
              break;
            case 'Scattered clouds':
              WeatherSVG = Cloud;
              break;
            default:
              WeatherSVG = Cloud;
          }

          return (
            <motion.div
              key={index}
              className='flex w-72 flex-col items-center gap-2 rounded-xl bg-neutral-600/60 p-8 sm:w-auto sm:p-6'
              {...animationProps}
            >
              <WeatherSVG className='text-[0.8rem]' />
              <p>{formatTime(day.dt_txt)}</p>
              <p>{day.main.temp}°C</p>
            </motion.div>
          );
        }
      )}
    </div>
  );
};

export default WeeklyWeatherCard;
