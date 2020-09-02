export const GET_WEATHER = 'reducers/GET_WEATHER';
export const GET_WEEK_WEATHER = 'reducers/GET_WEEK_WEATHER';
export const FIND_CITIES = 'reducers/FIND_CITIES';

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

type FindCitiesACType = {
	type: typeof FIND_CITIES;
	findCities: any;
};
export const findCitiesAC = (findCities: any): FindCitiesACType => ({ type: FIND_CITIES, findCities });

export type ActionsType = GetWeatherACType;