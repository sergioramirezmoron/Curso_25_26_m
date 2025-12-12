export const fetching = async (cityName) => {
  try {
    const API_URL = import.meta.env.VITE_API_OPENWEATHER;
    const API_KEY = import.meta.env.VITE_API_KEYWEATHER;
    const ruta = `${API_URL}?q=${cityName}&appid=${API_KEY}`;
    const response = await fetch(ruta);
    if (!response) return;
    return await response.json();
  } catch (error) {
    throw new Error(error);
  }
};

export const parseData = (data) => {
  console.log(data);
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
