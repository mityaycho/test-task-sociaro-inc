import { GET_WEATHER, ActionsType } from "./actions";
import { api } from "../api/apiFunc";
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

export const getCitiesTC = (cityName: string) => async (dispatch: Dispatch) => {
	try {
		
			const response = await api.getCities(cityName);
			console.log(response.data.list.map((el: any) => el.name))
		
	} catch (error) {
		return error;
	}
};