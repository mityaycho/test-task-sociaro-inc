import { api } from "../api/apiFunc";
import { Dispatch } from 'redux';
import { GET_CITIES, citiesReducerAC } from "./actions";



const initialState = {
	cities: [{
		name: 'Moscow',
		country: 'RU'
	}]
};

export const citiesReducer = (state = initialState, action: any) => {

	switch (action.type) {
		case GET_CITIES:
			return {
				...state, cities: [...action.findCities]
			};

		default:
			return state;
	};
};

export const getCitiesTC = (cityName: string) => async (dispatch: Dispatch) => {
	try {
		
			const response = await api.getCities(cityName);
			console.log(response.data.list.map((el: any) => ({name: el.name, country: el.sys.country})));
			const findCities = response.data.list.map((el: any) => (el.name));
		dispatch(citiesReducerAC(findCities))
	} catch (error) {
		return error;
	}
};