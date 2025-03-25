
import React from 'react';
import WeatherAnimation from './WeatherAnimation';
import { Thermometer, MapPin } from 'lucide-react';

interface WeatherCardProps {
  city: string;
  temperature: number;
  description: string;
  isLoading: boolean;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ 
  city, 
  temperature, 
  description,
  isLoading
}) => {
  if (isLoading) {
    return (
      <div className="weather-card animate-pulse w-full max-w-md">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-32 h-32 bg-gray-200 rounded-full"></div>
          <div className="h-7 bg-gray-200 rounded-full w-3/4"></div>
          <div className="h-16 bg-gray-200 rounded-full w-1/2"></div>
          <div className="h-4 bg-gray-200 rounded-full w-5/6"></div>
          <div className="h-4 bg-gray-200 rounded-full w-4/6"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="weather-card w-full max-w-md animate-scale-in">
      <div className="flex flex-col items-center">
        <WeatherAnimation temperature={temperature} />
        
        <div className="mt-6 flex items-center text-weather-gray">
          <MapPin className="w-5 h-5 mr-2" />
          <h2 className="text-xl font-medium">{city}</h2>
        </div>
        
        <div className="mt-4 flex items-center justify-center">
          <Thermometer className="text-primary w-8 h-8 mr-2" />
          <span className="text-5xl font-light text-gradient">
            {Math.round(temperature)}°C
          </span>
        </div>
        
        <div className="mt-8 text-center">
          <p className="text-lg text-weather-gray leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
