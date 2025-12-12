import { getWeatherByCityName } from "./helpers/weatherApi";
import { parseWeatherData } from "./helpers/weatherApi";
import "./style.css";

const data = await getWeatherByCityName("Madrid");
console.log(parseWeatherData(data));
