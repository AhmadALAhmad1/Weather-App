import React from 'react';

interface props {
  title: string;
  degree: string;
  unit: string;
  icon: React.ReactNode;
}
const WeatherCard = ({ icon, title, degree, unit }: props) => {
  return (
    <div className='flex gap-3 rounded-2xl bg-neutral-800 px-2 py-4'>
      <div className='flex items-center justify-center text-3xl'>{icon}</div>
      <div>
        <div className='font-bold'>{title}</div>
        <div>
          {degree}{' '}
          {unit}
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
