export const GET_WEATHER = 'reducers/GET_WEATHER';
export const GET_WEEK_WEATHER = 'reducers/GET_WEEK_WEATHER';
export const FIND_CITIES = 'reducers/FIND_CITIES';
export const WEEK_WEATHER = 'reducers/WEEK_WEATHER';
export const SELECTED_CITY = 'reducers/SELECTED_CITY';


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


type WeekWeatherACType = {
	type: typeof WEEK_WEATHER;
	weekWeather: any;
};
export const weekWeatherAC = (weekWeather: any): WeekWeatherACType => ({ type: WEEK_WEATHER, weekWeather });


type SelectedCityACType = {
	type: typeof SELECTED_CITY;
	selectedCity: any;
};
export const selectedCityAC = (selectedCity: any): SelectedCityACType => ({ type: SELECTED_CITY, selectedCity });



export type ActionsType = GetWeatherACType | WeekWeatherACType | SelectedCityACType;