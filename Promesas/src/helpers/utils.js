const VITE_API_URL = import.meta.env.VITE_API_URL;
//crear una funcion una con promise y otra con async await que permita traerse
//  de jsonplaceholder.typicode.com/photos el title y la imagen

export function dataJSONPromise() {
  fetch(VITE_API_URL)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error en la peticion al traer la data");
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.log("❌ Error ...", error);
    })
    .finally((message) => console.log("Cerrando JSONPromise"));
}

export const dataJSONAsync = async () => {
  try {
    const response = await fetch(VITE_API_URL);
    if (!response.ok) {
      throw new Error("Error en la peticion al traer la data");
    }
    const data = await response.json();
    const dataParseada = data.map((infoFoto) => {
      return {
        title: infoFoto.title,
        photo: infoFoto.thumbnailUrl,
      };
    });
    console.table(dataParseada);
  } catch (error) {
    console.log("❌ Error ...", error);
  }
};

// Crear una funcion que se le pase como parametro una ciudad y me devuelva temperatura humedad actual y el viento utilizando la api de openweathermap
const VITE_API_KEY = import.meta.env.VITE_API_KEY;
const VITE_API_OPENWEATHER = import.meta.env.VITE_API_OPENWEATHER;
export const dataWeatherPromise = (city = "Madrid") => {
  const URL = `${VITE_API_OPENWEATHER}?q=${city}&appid=${VITE_API_KEY}`;
  return fetch(URL)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error en la peticion al traer la data");
      }
      return response.json();
    })
    .then((data) => {
      console.log(`--------DATOS--------`);
      console.log(`🌡️ Temperatura: ${data.main.temp} °C`);
      const arrayImg = ["☁️", "⛈️", "⛅", "☀️"];
      const weather = data.weather[0].main;
      console.log(`☁️ Tiempo: ${weather}`);
      console.log(`🌬️ Viento: ${data.wind.speed}`);
    })
    .catch((error) => {
      console.log("❌ Error ...", error);
    })
    .finally((message) => console.log("Cerrando WeatherPromise"));
};

export const dataWeatherAsync = async (city = "Madrid") => {
  try {
    const URL = `${VITE_API_OPENWEATHER}?q=${city}&appid=${VITE_API_KEY}`;
    const response = await fetch(URL);
    if (!response.ok) {
      throw new Error("Error en la peticion al traer la data");
    }
    const data = await response.json();
    const dataParseada = {
      temperature: data.main.temp,
      weather: data.weather[0].main,
      wind: data.wind.speed,
    };
    console.table(dataParseada);
    return dataParseada;
  } catch (error) {
    console.log("❌ Error ...", error);
  }
};
