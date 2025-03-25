
interface WeatherResponse {
  location: string;
  temperature: number;
  error?: string;
}

interface WeatherResult {
  city: string;
  temperature: number;
  description: string;
  error?: string;
}

export const getWeather = async (city: string): Promise<WeatherResult> => {
  try {
    // In a real app, we would make an API call to your Python backend
    // For this frontend demo, we'll simulate a fetch with a slight delay
    
    // Simulate API call
    const response = await new Promise<WeatherResponse>((resolve, reject) => {
      setTimeout(() => {
        // Random temperature between 10 and 35
        const temperature = Math.random() * 25 + 10;
        
        if (city.toLowerCase() === 'error') {
          resolve({ error: 'Cidade não encontrada', location: '', temperature: 0 });
        } else {
          resolve({
            location: city,
            temperature: temperature,
          });
        }
      }, 1500); // simulate network delay
    });

    if (response.error) {
      return {
        city: '',
        temperature: 0,
        description: '',
        error: response.error
      };
    }

    // Simulate getting the AI description
    const description = await getAIDescription(city, response.temperature);
    
    return {
      city: response.location,
      temperature: response.temperature,
      description,
    };
  } catch (error) {
    console.error('Error fetching weather:', error);
    return {
      city: '',
      temperature: 0,
      description: '',
      error: 'Erro ao buscar os dados do clima. Tente novamente.'
    };
  }
};

const getAIDescription = async (city: string, temperature: number): Promise<string> => {
  // For demo, generate simple descriptions based on temperature
  // In a real app, this would call your Python backend
  
  await new Promise(resolve => setTimeout(resolve, 500)); // add a small delay
  
  const temp = Math.round(temperature);
  
  if (temp >= 30) {
    return `Está muito quente em ${city} hoje! Com ${temp}°C, recomendo usar roupas leves e beber bastante água.`;
  } else if (temp >= 25) {
    return `O clima está agradável em ${city}, com ${temp}°C. Ótimo dia para atividades ao ar livre.`;
  } else if (temp >= 20) {
    return `Temperatura amena em ${city} hoje. Com ${temp}°C, é um bom dia para uma caminhada.`;
  } else if (temp >= 15) {
    return `Clima fresco em ${city} com ${temp}°C. Considere levar um agasalho leve.`;
  } else {
    return `Está frio em ${city} hoje! Com ${temp}°C, não esqueça de se agasalhar bem.`;
  }
};
