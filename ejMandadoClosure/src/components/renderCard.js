export const renderCard = (city) => {
  const container = document.createElement("div");
  const card = document.createElement("div");
  const cityName = document.createElement("h3");
  cityName.textContent = city.city;
  const cityCountry = document.createElement("p");
  cityCountry.textContent = city.country;
  const tempEl = document.createElement("p");
  tempEl.textContent = `${city.temperature}ºC`;
  const humidityEl = document.createElement("p");
  humidityEl.textContent = `Humedad: ${city.humidity}%`;
  const windEl = document.createElement("p");
  windEl.textContent = `Viento: ${city.wind} m/s`;
  const descriptionEl = document.createElement("p");
  descriptionEl.textContent = city.description;

  card.appendChild(cityName);
  card.appendChild(cityCountry);
  card.appendChild(tempEl);
  card.appendChild(humidityEl);
  card.appendChild(windEl);
  card.appendChild(descriptionEl);
  container.appendChild(card);
  return container;
};
