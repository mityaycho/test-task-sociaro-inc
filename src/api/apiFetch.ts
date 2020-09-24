import { instance, apiKey } from './api';

interface Iweather {
	description: string;
	icon: string;
	id: number;
	main: string;
};

type GetWeatherType = {
	base: string;
	clouds: { all: number };
	cod: number;
	coord: { lon: number, lat: number };
	dt: number;
	id: number;
	main: {
		temp: number;
		feels_like: number;
		temp_min: number;
		temp_max: number;
		pressure: number;
		humidity: number;
	};
	name: string;
	sys: {
		type: number;
		id: number;
		country: string;
		sunrise: number;
		sunset: number;
	};
	timezone: number;
	visibility: number;
	weather: Array<Iweather>;
	wind: { speed: number, deg: number };
};

// Два запроса за погоодой Первый - основная погода по выбранному городу, Второй - с геолокацией для данных по дням недели
export const api = {
	getWeather(cityName: string) {
		return instance.get<GetWeatherType>(`weather?q=${cityName}&units=metric&appid=${apiKey}`)
		.then(res => res.data);
	},
	getWeekWeather(lat: number, lon: number) {
		return instance.get(`onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,current&appid=${apiKey}`)
		.then(res => res.data);
	},
	getCities(cityName: string) {
		return instance.get(`find?q=${cityName}&units=metric&appid=${apiKey}`);
	}
};