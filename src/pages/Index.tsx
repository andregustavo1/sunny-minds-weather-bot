
import React, { useState } from 'react';
import SearchBar from '@/components/SearchBar';
import WeatherCard from '@/components/WeatherCard';
import { getWeather } from '@/utils/weatherApi';
import { toast } from '@/hooks/use-toast';
import { CloudSun } from 'lucide-react';

const Index = () => {
  const [weatherData, setWeatherData] = useState<{
    city: string;
    temperature: number;
    description: string;
  } | null>(null);
  
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (city: string) => {
    setIsLoading(true);
    
    try {
      const result = await getWeather(city);
      
      if (result.error) {
        toast({
          title: "Erro",
          description: result.error,
          variant: "destructive",
        });
        setWeatherData(null);
      } else {
        setWeatherData({
          city: result.city,
          temperature: result.temperature,
          description: result.description,
        });
      }
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao buscar os dados do clima.",
        variant: "destructive",
      });
      setWeatherData(null);
    } finally {
      setIsLoading(false);
      setHasSearched(true);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-4xl mx-auto flex flex-col items-center">
        {/* Header */}
        <div className="mb-8 text-center animate-fade-in">
          <div className="inline-flex items-center mb-4">
            <CloudSun className="text-primary w-8 h-8 mr-2" />
            <h1 className="text-3xl font-semibold">Clima Tempo</h1>
          </div>
          <p className="text-weather-gray">
            Previsão do tempo com inteligência artificial
          </p>
        </div>
        
        {/* Search */}
        <div className="w-full mb-10 animate-slide-up">
          <SearchBar onSearch={handleSearch} isLoading={isLoading} />
        </div>
        
        {/* Weather Card or Initial State */}
        <div className="w-full flex justify-center">
          {hasSearched ? (
            weatherData ? (
              <WeatherCard
                city={weatherData.city}
                temperature={weatherData.temperature}
                description={weatherData.description}
                isLoading={isLoading}
              />
            ) : (
              <div className="text-center p-8 animate-fade-in">
                <p className="text-weather-gray">
                  Nenhum resultado encontrado. Tente outra cidade.
                </p>
              </div>
            )
          ) : (
            <div className="glass-panel p-8 rounded-3xl text-center max-w-md animate-fade-in">
              <CloudSun className="w-16 h-16 text-primary/30 mx-auto mb-4" />
              <h2 className="text-xl font-medium mb-2">
                Previsão do Tempo com IA
              </h2>
              <p className="text-weather-gray">
                Digite o nome de uma cidade para obter a previsão do tempo atual com descrição gerada por inteligência artificial.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
