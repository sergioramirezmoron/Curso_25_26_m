// 1. Crear una función llamada getWeatherByCityName que devuelva una data en json.
// 2. Crear una función llamada parseWeatherData(data) que devuelva:
//  2.1 Ciudad, País, Temperatura, Humedad, Viento, Descripción.

export const getWeatherByCityName = async (cityName) => {
  const API_URL = import.meta.env.VITE_API_OPENWEATHER;
  const API_KEY = import.meta.env.VITE_API_KEYWEATHER;
  try {
    const response = await fetch(
      `${API_URL}?q=${cityName}&lang=es&appid=${API_KEY}`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return await response.json();
  } catch (error) {
    throw new Error("Error haciendo fetching");
  }
};

export const parseWeatherData = (data) => {
  const dataParsed = {
    city: data.name,
    country: data.sys.country,
    temperature: (data.main.temp - 273).toFixed(1),
    humidity: data.main.humidity,
    wind: data.wind.speed,
    description: data.weather[0].description,
  };

  return dataParsed;
};
