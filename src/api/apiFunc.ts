
import { instance, apiKey } from './api';
import citiesJson from '../assets/cities/city.list.json'

export const api = {
	getWeather(cityName: string) {
			return instance.get(`weather?q=${cityName}&units=metric&appid=${apiKey}`);
	},
	getCities() {
		// debugger
		// const jsonCities = JSON.parse(citiesJson as any);
		//  return jsonCities;
		return citiesJson;
	}
};