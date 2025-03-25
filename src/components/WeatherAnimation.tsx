
import React from 'react';
import { Sun, CloudSun, CloudRain } from 'lucide-react';

interface WeatherAnimationProps {
  temperature: number;
}

const WeatherAnimation: React.FC<WeatherAnimationProps> = ({ temperature }) => {
  // Determine which weather icon to show based on temperature
  const getWeatherIcon = () => {
    if (temperature >= 25) {
      return <Sun className="text-yellow-400 w-full h-full animate-pulse-subtle" />;
    } else if (temperature >= 15) {
      return <CloudSun className="text-blue-400 w-full h-full animate-pulse-subtle" />;
    } else {
      return <CloudRain className="text-blue-600 w-full h-full animate-pulse-subtle" />;
    }
  };

  return (
    <div className="w-32 h-32 mx-auto animate-float">
      {getWeatherIcon()}
    </div>
  );
};

export default WeatherAnimation;
