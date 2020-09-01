import { instance, apiKey } from './api';

interface Iweather {
	description: string
	icon: string
	id: number
	main: string
}

type GetWeatherType = {
	base: string
	clouds: { all: number }
	cod: number
	coord: { lon: number, lat: number }
	dt: number
	id: number
	main: {
		temp: number,
		feels_like: number,
		temp_min: number,
		temp_max: number,
		pressure: number,
		humidity: number
	}
	name: string
	sys: {
		type: number,
		id: number,
		country: string,
		sunrise: number,
		sunset: number
	}
	timezone: number
	visibility: number
	weather: Array<Iweather>
	wind: { speed: number, deg: number }
};


export const api = {
	getWeather(cityName: string) {
		return instance.get<GetWeatherType>(`weather?q=${cityName}&units=metric&appid=${apiKey}`).then(res => res.data);
	},
	getCities(cityName: string) {
		return instance.get(`find?q=${cityName}&units=metric&appid=${apiKey}`);
	}
};