export const GET_WEATHER = 'reducers/GET_WEATHER';
export const GET_WEEK_WEATHER = 'reducers/GET_WEEK_WEATHER';
export const GET_CITIES = 'reducers/GET_CITIES';

type GetWeatherACType = {
	type: typeof GET_WEATHER;
	weather: any;
};
export const getWeatherAC = (weather: any): GetWeatherACType => ({ type: GET_WEATHER, weather });

type GetWeekWeatherType = {
	type: typeof GET_WEEK_WEATHER;
	weekWeather: any;
};
export const getWeekWeatherAC = (weekWeather: any): GetWeekWeatherType => ({ type: GET_WEEK_WEATHER, weekWeather });

type CitiesReducerACType = {
	type: typeof GET_CITIES;
	findCities: any;
};
export const citiesReducerAC = (findCities: any): CitiesReducerACType => ({ type: GET_CITIES, findCities });

export type ActionsType = GetWeatherACType;