import { api } from "../api/apiFetch";
import { Dispatch } from 'redux';
import { FIND_CITIES, findCitiesAC, CitiesReducerACType } from "./actions";

type StateFindCitiesType = typeof initialState;

const initialState = {
	cities: [{
		city: undefined as undefined | string,
		country: undefined as undefined | string
	}]
};

// Создаю отдельный стейт для хранения найденных городов, для выбора в выпадашке
export const citiesReducer = (state: StateFindCitiesType = initialState, action: CitiesReducerACType) => {

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
			const findCities = response.data.list.map((el: any) => ({city: el.name, country: el.sys.country}));

		dispatch(findCitiesAC(findCities));
	} catch (error) {
		return error;
	}
}