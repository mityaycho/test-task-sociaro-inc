import { GET_WEATHER, ActionsType, getWeatherAC } from "./actions";
import { api } from "../api/apiFunc";
import { Dispatch } from 'redux';

export const dateСonvertation = (value: any) => {
	let months = [
		'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
	];

	let days = [
		'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
	];

	let date = new Date(+value * 1000);
	let hour = date.getHours();
	let minute = date.getMinutes();
	let day = days[date.getDay()];
	let numberOfMonths = date.getDate();
	let month = months[date.getMonth()];
	let year = date.getFullYear();

	return { day, month, year, hour, minute, numberOfMonths };
}

const initialState = {};

export const weatherReducer = (state = initialState, action: ActionsType) => {

	switch (action.type) {
		case GET_WEATHER:
			return {
				...state, ...action.weather
			};

		default:
			return state;
	};
};

export const getWeatherTC = (city: string) => async (dispatch: Dispatch) => {
	try {
			const response = await api.getWeather(city);
			console.log(response.data)
			const data = response.data;

			const newData = {
				success: true,
				description: data.weather[0].description,
				temperature: Math.round(data.main.temp),
				temperatureChange: {
					temp_min: Math.round(data.main.temp_min),
					temp_max: Math.round(data.main.temp_max)
				},
				city: data.name,
				country: data.sys.country,
				humidity: data.main.humidity,
				pressure: data.main.pressure,
				wind: data.wind.speed,
				sunrise: `${dateСonvertation(data.sys.sunrise).hour}:${dateСonvertation(data.sys.sunrise).minute}`,
				sunset: `${dateСonvertation(data.sys.sunset).hour}:${dateСonvertation(data.sys.sunset).minute}`,
				daytime: `${dateСonvertation(data.dt).hour}:${dateСonvertation(data.dt).minute}`,
				dt: data.dt,
				error: undefined
			}

		dispatch(getWeatherAC(newData));

	} catch (error) {
		return error;
	}
};