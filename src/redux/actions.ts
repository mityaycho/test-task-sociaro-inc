export const GET_WEATHER = 'reducers/GET_WEATHER';

type GetWeatherACType = {
	type: typeof GET_WEATHER;
};
export const getWeatherAC = (): GetWeatherACType => ({ type: GET_WEATHER });

export type ActionsType = GetWeatherACType;