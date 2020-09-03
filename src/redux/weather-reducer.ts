import {
	GET_WEATHER,
	ActionsType,
	getWeatherAC,
	WEEK_WEATHER,
	weekWeatherAC,
	selectedCityAC,
	SELECTED_CITY
} from "./actions";
import { api } from "../api/apiFetch";
import { Dispatch } from 'redux';
import { dateСonvertation } from "../assets/reusableJS";

export type WeekWeatherType = {
	dt: undefined | string;
	daytime: undefined | string;
	temp_min: number;
	temp_max: number;
	temp_day: number;
};

export type SelectedCityType = {
	city: any;
	country: any;
	temperature: any;
}

export type StateWeatherType = {
	weather: {
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
	};
	backgroundDayNight: boolean;
	weekWeather: Array<WeekWeatherType>;
	selectedCity: Array<SelectedCityType>;
};

const initialState = {
	weather: {
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
		error: undefined
	},
	backgroundDayNight: true,
	weekWeather: [],
	selectedCity: []
};

export const weatherReducer = (state: StateWeatherType = initialState, action: ActionsType) => {

	switch (action.type) {
		case GET_WEATHER:
			return {
				...state, weather: { ...action.weather }
			};

		case WEEK_WEATHER:
			return {
				...state, weekWeather: [...action.weekWeather]
			};

		case SELECTED_CITY:

			return {
				...state, selectedCity: [...state.selectedCity, action.selectedCity]
			};

		default:
			return state;
	};
};

export const getWeatherTC = (city: string) => async (dispatch: Dispatch) => {
	try {
		
		const data = await api.getWeather(city);
		const weekWeather = await api.getWeekWeather(data.coord.lat, data.coord.lon);

		const sunrise = dateСonvertation(data.sys.sunrise);
		const sunset = dateСonvertation(data.sys.sunset);
		const dayTime = dateСonvertation(data.dt);

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
			sunrise: `${sunrise.hour}:${sunrise.minute}`,
			sunset: `${sunset.hour}:${sunset.minute}`,
			daytime: `${dayTime.hour}:${dayTime.minute}`,
			dt: data.dt,
			error: undefined,
			backgroundDayNight: data.dt > data.sys.sunrise && data.dt < data.sys.sunset ? true : false
		};

		const weekWeatherData = weekWeather.daily.map((el: any) => {
			return {
				dt: el.dt,
				weather: el.weather[0].main,
				tempMax: el.temp.max,
				tempMin: el.temp.min
			}
		})

		const selectedCityData = {
			city: data.name,
			country: data.sys.country,
			temperature: Math.round(data.main.temp)
		};

		dispatch(getWeatherAC(newData));
		dispatch(weekWeatherAC(weekWeatherData));
		dispatch(selectedCityAC(selectedCityData));
	} catch (error) {
		return error;
	}
};