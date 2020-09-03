import {
	GET_WEATHER,
	ActionsType,
	getWeatherAC,
	WEEK_WEATHER,
	weekWeatherAC,
	historySearchAC,
	HISTORY_SEARCH
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

export type historySearchType = {
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
	historySearch: Array<historySearchType>;
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
	historySearch: []
};

export const weatherReducer = (state: StateWeatherType = initialState, action: ActionsType) => {

	switch (action.type) {
		// сохраняю основные данные по выбранному городу для отрисовки
		case GET_WEATHER:
			return {
				...state, weather: { ...action.weather }
			};
// сохраняю данные по дням недели
		case WEEK_WEATHER:
			return {
				...state, weekWeather: [...action.weekWeather]
			};
// сохраняю данные по истории поиска
		case HISTORY_SEARCH:

			return {
				...state, historySearch: [...state.historySearch, action.historySearch]
			};

		default:
			return state;
	};
};

export const getWeatherTC = (city: string) => async (dispatch: Dispatch) => {
	try {
		let historySearchLS;
		if (!localStorage.getItem('historySearchLS')) {
			localStorage.setItem("historySearchLS", JSON.stringify([]));
		} else {
		historySearchLS = JSON.parse(localStorage.getItem('historySearchLS')!);
	}
// Создаю переменную для локал стореджа, делаю запрос за выбранным городом и запрос для дней недели
		const data = await api.getWeather(city);
		const weekWeather = await api.getWeekWeather(data.coord.lat, data.coord.lon);
// Создаю переменные для удобства обработки данных в дальнейшем
		const sunrise = dateСonvertation(data.sys.sunrise);
		const sunset = dateСonvertation(data.sys.sunset);
		const dayTime = dateСonvertation(data.dt);
// Создаю объект, что будет храниться в локал стейте
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
			backgroundDayNight: data.dt > data.sys.sunrise && data.dt < data.sys.sunset
		};

// Создаю массив с объектами по дням недели
		const weekWeatherData = weekWeather.daily.map((el: any) => {
			return {
				dt: el.dt,
				weather: el.weather[0].main,
				tempMax: el.temp.max,
				tempMin: el.temp.min
			}
		})
// Создаю объект для сохранения найденного города
		const historySearchData = {
			city: data.name,
			country: data.sys.country,
			temperature: Math.round(data.main.temp)
		};
// Сохраняю данные в локалсторедж и запускаю три диспатча для обновления данных в иницализированном стейте
		localStorage.setItem('historySearchLS', JSON.stringify(historySearchData));
		dispatch(getWeatherAC(newData));
		dispatch(weekWeatherAC(weekWeatherData));
		historySearchLS === '' ? dispatch(historySearchAC(historySearchData)) : dispatch(historySearchAC(historySearchLS));
	} catch (error) {
		return error;
	}
};