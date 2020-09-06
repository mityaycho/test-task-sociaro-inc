import React, { useCallback, useState, useEffect, MouseEvent } from 'react';
import styles from './HistorySearch.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { getWeatherTC } from '../../redux/weather-reducer';
import { Typeahead } from '@gforge/react-typeahead-ts';
import geoTagInput from './../../assets/images/geo-tag-black.png';
import { withRouter } from 'react-router-dom';
import { historySearchAC } from '../../redux/actions';

// Отрисовка истории поиска
const SearchHistory = React.memo((props: any) => {
	// Забираю историю найденных городов из Редакс и создаю переменную в локальном стейте
	const dispatch = useDispatch();
	const { historySearch } = useSelector((state: any) => state.weatherState);
	const [citySelected, setCitySelected] = useState('');
	useEffect(() => {
		dispatch(historySearchAC(JSON.parse(localStorage.getItem('historySearchLS') || '[]')))
	}, [dispatch]);
	// Диспатчу выбранный город и перехожу на страницу с выбранным городом
	const selectedCityOnOptions = useCallback((e: any) => {
		dispatch(getWeatherTC(e));
		props.history.push('selectedCity');
	}, [props.history, dispatch]);
	// Сохраняю введённые значения в локальном стейте
	const searchCities = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		setCitySelected(e.currentTarget.value);
	}, []);
	// Проверяю нажата ли кнопка ВВОД и дальше диспатчу и перехожу на страницу с городом
	const keyPressEnter = useCallback((e: React.KeyboardEvent) => {
		e.key === "Enter" && dispatch(getWeatherTC(citySelected));
		e.key === "Enter" && props.history.push('selectedCity');
	}, [props.history, citySelected, dispatch]);

	const setOrDeleteCity = useCallback((e) => {
		dispatch(getWeatherTC(e.target.dataset.city));
		props.history.push('selectedCity');
	}, [props.history, dispatch]);
	// Отрисовка найденного города и далее запихиваю их в список с найденными городами
	const selectedCityJSX = historySearch.map((el: any) =>
		<li key={uuidv4()} className={styles.historyCity} onClick={setOrDeleteCity}>
			<p data-city={el.city}>{el.city}, {el.country}</p>
			<button className={styles.buttonDelete}>delete</button>
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