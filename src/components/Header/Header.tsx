import React, { useCallback, useState } from 'react';
import styles from './Header.module.css';
import { Typeahead } from '@gforge/react-typeahead-ts';
import { useDispatch, useSelector } from 'react-redux';
import { getCitiesTC } from '../../redux/cities-reducer';
import { withRouter } from 'react-router-dom';
import { getWeatherTC } from './../../redux/weather-reducer';



function Header(props: any) {

	const [citySelected, setCitySelected] = useState('');
	const dispatch = useDispatch();
	const findCities = useSelector((state: any) => state.citiesState.cities);

	const backgroundDayNight = useSelector((state: any) => state.weatherState.backgroundDayNight);

	const selectedCityOnOptions = useCallback((e: any) => {
		dispatch(getWeatherTC(e));
		props.history.push('selectedCity');
	}, [props.history, dispatch]);

	const searchCities = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		setCitySelected(e.currentTarget.value);
	}, []);

	const keyPressEnter = useCallback((e: React.KeyboardEvent) => {
		dispatch(getCitiesTC(citySelected));
	}, [citySelected, dispatch]);

	const changeRoute = useCallback(() => {
		props.history.push('historySearch');
	}, [props.history]);

	return (
		<div className={`${styles.header} ${backgroundDayNight ? styles.day : styles.night}`}>
			<Typeahead
				className={styles.inputTypeahead}
				options={findCities.map((el: any) => `${el.name}, ${el.country}`)}
				placeholder="Search city"
				value={citySelected}
				onChange={searchCities}
				onKeyPress={keyPressEnter}
				onOptionSelected={selectedCityOnOptions} />
				<button className={styles.historyBtn} onClick={changeRoute}>history</button>
		</div>
	);
};

export default withRouter(Header);