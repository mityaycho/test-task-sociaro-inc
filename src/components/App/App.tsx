import React, { useState, useCallback } from 'react';
import styles from './App.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { getWeatherTC } from '../../redux/weather-reducer';
import { Typeahead } from '@gforge/react-typeahead-ts';
import { getCitiesTC } from '../../redux/cities-reducer';
import Header from '../Header/Header';
import SelectedCity from '../SelectedCity/SelectedCity';

function App() {

	const [citySelected, setCitySelected] = useState('');
	const dispatch = useDispatch();
	const findCities = useSelector((state: any) => state.citiesState.cities)

	const getWeather = useCallback((e: any) => {
		console.log(e)
		dispatch(getWeatherTC(e));
		setCitySelected(e)
	}, [setCitySelected, dispatch]);

	const getWeatherOne = useCallback((e: React.FormEvent<HTMLInputElement>) => {
		dispatch(getWeatherTC(e.currentTarget.value));
	}, [dispatch]);

	return (
		<div className={styles.App}>
			<section className={styles.AppContainer}>
				<Header />
				<SelectedCity />

			</section>
			{/* <input type="text" onChange={getWeatherOne} />
			<Typeahead options={findCities} value={citySelected} onOptionSelected={getWeather} />
			<button onClick={() => dispatch(getCitiesTC('moscow'))}>get cities</button> */}

		</div>
	);
};

export default App;