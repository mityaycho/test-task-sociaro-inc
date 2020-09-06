export const GET_WEATHER = 'reducers/GET_WEATHER';
export const GET_WEEK_WEATHER = 'reducers/GET_WEEK_WEATHER';
export const WEEK_WEATHER = 'reducers/WEEK_WEATHER';
export const HISTORY_SEARCH = 'reducers/HISTORY_SEARCH';
export const DELETE_CITY = 'reducers/DELETE_CITY';
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


type WeekWeatherACType = {
	type: typeof WEEK_WEATHER;
	weekWeather: any;
};
export const weekWeatherAC = (weekWeather: any): WeekWeatherACType => ({ type: WEEK_WEATHER, weekWeather });


type HistorySearchACType = {
	type: typeof HISTORY_SEARCH;
	historySearch: any;
};
export const historySearchAC = (historySearch: any): HistorySearchACType => ({ type: HISTORY_SEARCH, historySearch });


type DeleteHistoryCityACType = {
	type: typeof DELETE_CITY;
	city: string;
};
export const deleteHistoryCityAC = (city: string): DeleteHistoryCityACType => ({ type: DELETE_CITY, city });


type CitiesReducerACType = {
	type: typeof FIND_CITIES;
	findCities: any
};
export const findCitiesAC = (findCities: any): CitiesReducerACType => ({ type: FIND_CITIES, findCities })



export type ActionsType = GetWeatherACType | WeekWeatherACType | HistorySearchACType | DeleteHistoryCityACType;