import React, { useState, useCallback } from 'react';
import styles from './App.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { getWeatherTC } from '../../redux/weather-reducer';
import { Typeahead } from '@gforge/react-typeahead-ts';
import { getCitiesTC } from '../../redux/cities-reducer';
import Header from '../Header/Header';
import CheckedCity from '../CheckedCity/CheckedCity';

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
				<CheckedCity />
				
      </section>
			<input type="text" onChange={getWeatherOne}/>
				<Typeahead options={findCities} value={citySelected} onOptionSelected={getWeather} />
				<button onClick={() => dispatch(getCitiesTC('moscow'))}>get cities</button>
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
    </div>
  );
};

export default App;