import { GET_WEATHER, ActionsType } from "./actions";
import { api } from "../api/getWeather";
import { Dispatch } from 'redux';



const initialState = {};

export const weatherReducer = (state = initialState, action: ActionsType) => {

	switch (action.type) {
		case GET_WEATHER:
			return {
				...state
			};

		default:
			return state;
	};
};

export const getWeatherTC = (city: string) => async (dispatch: Dispatch) => {
	try {
		
			const response = await api.getWeather(city);
			console.log(response)
		
	} catch (error) {
		return error;
	}
};