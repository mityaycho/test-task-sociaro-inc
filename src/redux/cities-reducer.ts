import { api } from "../api/apiFetch";
import { Dispatch } from 'redux';
import { FIND_CITIES, findCitiesAC } from "./actions";



const initialState = {
	cities: [{
		name: '',
		country: '',
		coord: {}
	}]
};

export const citiesReducer = (state = initialState, action: any) => {

	switch (action.type) {
		case FIND_CITIES:
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
		const findCities = response.data.list.map((el: any) => ({
			name: el.name,
			country: el.sys.country,
			coord: el.coord
		}));
		
		localStorage.setItem('findCitites', JSON.stringify(findCities));
		dispatch(findCitiesAC(findCities));
	} catch (error) {
		return error;
	}
};