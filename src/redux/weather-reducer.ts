import {
	GET_WEATHER,
	ActionsType,
	getWeatherAC,
	WEEK_WEATHER,
	weekWeatherAC,
	historySearchAC,
	HISTORY_SEARCH,
	DELETE_CITY
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

type StateWeatherType = typeof initialState;

const initialState = {
	weather: {
		success: false as boolean,
		description: undefined as undefined | string,
		temperature: undefined as undefined | number,
		temperatureChange: undefined as undefined,
		city: undefined as undefined | string,
		country: undefined as undefined | string,
		humidity: undefined as undefined | string,
		pressure: undefined as undefined | string,
		wind: undefined as undefined | string,
		sunrise: undefined as undefined | string,
		sunset: undefined as undefined | string,
		daytime: undefined as undefined | string,
		dt: undefined as undefined | string,
		error: undefined as undefined | string,
		backgroundDayNight: true as boolean
	},
	weekWeather: [] as Array<WeekWeatherType>,
	historySearch: [] as Array<historySearchType>
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
				...state, historySearch: action.historySearch
			};

		case DELETE_CITY:
			const newArrayWithoutDeleteCity = state.historySearch.filter(el => el.city !== action.city);
			localStorage.setItem('historySearchLS', JSON.stringify([]));
			localStorage.setItem('historySearchLS', JSON.stringify(newArrayWithoutDeleteCity));
			return {
				...state, historySearch: newArrayWithoutDeleteCity
			};

		default:
			return state;
	};
};

export const getWeatherTC = (city: string) => async (dispatch: Dispatch) => {
	try {
		let historySearchLS = [];
		if (!localStorage.getItem('historySearchLS')) {
			localStorage.setItem("historySearchLS", JSON.stringify([]));
		} else {
			historySearchLS = JSON.parse(localStorage.getItem('historySearchLS') || '[]');
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
		!historySearchLS ?
			localStorage.setItem('historySearchLS', JSON.stringify([historySearchData])) :
			localStorage.setItem('historySearchLS', JSON.stringify([historySearchData, ...historySearchLS]));
		dispatch(getWeatherAC(newData));
		dispatch(weekWeatherAC(weekWeatherData));
		historySearchLS ?
			dispatch(historySearchAC([historySearchData, ...historySearchLS])) :
			dispatch(historySearchAC([historySearchData]));
	} catch (error) {
		return error;
	}
};