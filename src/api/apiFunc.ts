import { instance, apiKey } from './api';

export const api = {
	getWeather(cityName: string) {
			return instance.get(`weather?q=${cityName}&units=metric&appid=${apiKey}`);
	},
	getCities() {
		
	
	}
};