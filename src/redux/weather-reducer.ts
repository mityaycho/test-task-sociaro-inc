import { GET_WEATHER, ActionsType, getWeatherAC } from "./actions";
import { api } from "../api/apiFunc";
import { Dispatch } from 'redux';

export const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
export const dateСonvertation = (value: any) => {
	const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
	const date = new Date(+value * 1000);
	const hour = date.getHours();
	const minute = date.getMinutes();
	const day = DAYS[date.getDay()];
	const numberOfMonths = date.getDate();
	const month = MONTHS[date.getMonth()];
	const year = date.getFullYear();

	return { day, month, year, hour, minute, numberOfMonths };
};

export type StateWeatherType = {
	success: boolean;
	description: undefined | string;
	temperature: undefined | number;
	temperatureChange: undefined;
	city: undefined | string;
	country: undefined | string;
	humidity: undefined | string;
	pressure: undefined | string;
	wind: undefined | string;
	sunrise: undefined | string;
	sunset: undefined | string;
	daytime: undefined | string;
	dt: undefined | string;
	error: undefined | string;
	backgroundDayNight: boolean;
}

const initialState = {
	success: false,
	description: undefined,
	temperature: undefined,
	temperatureChange: undefined,
	city: undefined,
	country: undefined,
	humidity: undefined,
	pressure: undefined,
	wind: undefined,
	sunrise: undefined,
	sunset: undefined,
	daytime: undefined,
	dt: undefined,
	error: undefined,
	backgroundDayNight: true
};

export const weatherReducer = (state: StateWeatherType = initialState, action: ActionsType) => {

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
			const data = await api.getWeather(city);
		

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
				error: undefined,
				backgroundDayNight: data.dt > data.sys.sunrise && data.dt < data.sys.sunset ? true : false
			}

		dispatch(getWeatherAC(newData));
	} catch (error) {
		return error;
	}
};