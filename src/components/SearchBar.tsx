
import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface SearchBarProps {
  onSearch: (city: string) => void;
  isLoading: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, isLoading }) => {
  const [city, setCity] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (city.trim() === '') {
      toast({
        title: "Erro",
        description: "Por favor, insira um nome de cidade válido.",
        variant: "destructive",
      });
      return;
    }
    
    onSearch(city);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto">
      <div className="search-bar">
        <Search className="text-weather-gray w-5 h-5" />
        <input
          type="text"
          className="search-input"
          placeholder="Em qual cidade você quer ver o clima?"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          disabled={isLoading}
        />
        <button
          type="submit"
          className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center transition-all hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isLoading || !city.trim()}
        >
          <svg 
            width="14" 
            height="14" 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              d="M5 12H19M19 12L12 5M19 12L12 19" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
