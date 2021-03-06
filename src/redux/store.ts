import { combineReducers, createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { weatherReducer } from './weather-reducer';
import { citiesReducer } from './findCities-reducer';


const reducers = combineReducers({
	weatherState: weatherReducer,
	citiesState: citiesReducer
});

declare global {
	interface Window {
		__REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
	}
};

export type AppStateType = ReturnType<typeof reducers>;

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


export const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));