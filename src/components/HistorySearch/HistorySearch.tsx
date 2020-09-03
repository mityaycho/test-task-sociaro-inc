import React, { useCallback, useState } from 'react';
import styles from './HistorySearch.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { getWeatherTC } from '../../redux/weather-reducer';
import { Typeahead } from '@gforge/react-typeahead-ts';
import geoTagInput from './../../assets/images/geo-tag-black.png';
import { withRouter } from 'react-router-dom';


const SearchHistory = React.memo((props: any) => {

	const dispatch = useDispatch();
	const { historySearch } = useSelector((state: any) => state.weatherState);
	const [citySelected, setCitySelected] = useState('');

	const selectedCityOnOptions = useCallback((e: any) => {
		dispatch(getWeatherTC(e));
		props.history.push('selectedCity');
	}, [props.history, dispatch]);

	const searchCities = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		setCitySelected(e.currentTarget.value);
	}, []);

	const keyPressEnter = useCallback((e: React.KeyboardEvent) => {
		e.key === "Enter" && dispatch(getWeatherTC(citySelected));
		e.key === "Enter" && props.history.push('selectedCity');
	}, [props.history, citySelected, dispatch]);

	const selectedCityJSX = historySearch.map((el: any) =>
		<li key={uuidv4()} className={styles.historyCity}>
			<p>{el.city}, {el.country}</p>
			<p>{el.temperature}&#176;C</p>
		</li>);

	return (
		<div>
			<p className={styles.locationTitle}>Location</p>
			<img className={styles.geoTag} src={geoTagInput} alt="icon geo-tag" />
			<Typeahead
				className={styles.inputTypeahead}
				options={historySearch.map((el: any) => el.city)}
				placeholder="Search city"
				value={citySelected}
				onChange={searchCities}
				onKeyDown={keyPressEnter}
				onOptionSelected={selectedCityOnOptions} />
			<ul className={styles.historyList}></ul>
			{selectedCityJSX}
		</div>
	);
});

export default withRouter(SearchHistory);