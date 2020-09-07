import React, { useCallback, useState, useEffect } from 'react';
import styles from './HistorySearch.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { getWeatherTC } from '../../redux/weather-reducer';
import { Typeahead } from '@gforge/react-typeahead-ts';
import geoTagInput from './../../assets/images/geo-tag-black.png';
import { withRouter } from 'react-router-dom';
import { historySearchAC, deleteHistoryCityAC, searchPageAC } from '../../redux/actions';
import { getCitiesTC } from '../../redux/findCities-reducer';

// Отрисовка истории поиска
const HistorySearch = React.memo((props: any) => {
	// Забираю историю найденных городов из Редакс и создаю переменную в локальном стейте

	const dispatch = useDispatch();
	const historySearch = useSelector((state: any) => state.weatherState.historySearch);
	const findCities = useSelector((state: any) => state.citiesState.cities);
	const [citySelected, setCitySelected] = useState('');
	// Ставлю на монтирование компонента обновление данных из локального стейта браузера и добавляю анимацию
	useEffect(() => {
		dispatch(historySearchAC(JSON.parse(localStorage.getItem('historySearchLS') || '[]')));
		dispatch(searchPageAC(false));
	}, [dispatch]);

	// Диспатчу выбранный город и перехожу на страницу с выбранным городом
	const selectedCityOnOptions = useCallback((e: any) => {
		dispatch(getWeatherTC(e));
		setCitySelected('');
		props.history.push('selectedCity');
	}, [props.history, dispatch]);

	// Сохраняю введённые значения в локальном стейте
	const searchCities = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		setCitySelected(e.currentTarget.value);
		dispatch(getCitiesTC(e.currentTarget.value));
	}, [dispatch]);

	// Проверяю нажата ли кнопка ВВОД и дальше диспатчу и перехожу на страницу с городом
	const keyPressEnter = useCallback((e: React.KeyboardEvent) => {
		if (e.key === "Enter") {
			dispatch(getWeatherTC(citySelected));
			dispatch(searchPageAC(false));
			setCitySelected('');
			props.history.push('selectedCity');
		}
	}, [props.history, citySelected, dispatch]);

	// Выбираю город из списка, пинаю сервер и делаю переход на новую страницу
	const setActiveOrDeleteCity = useCallback((e) => {
		// Делаю проверку где произошёл клик, если на кнопке выбрать город, пинаю сервер и отрисовываю
		if (e.target.dataset.active === 'active') {
			dispatch(getWeatherTC(e.target.dataset.city));
			props.history.push('selectedCity');
		}
		// Делаю проверку на кнопку удаления и пинаю санку, где всё обновляю
		if (e.target.dataset.button === 'delete') {
			dispatch(deleteHistoryCityAC(e.currentTarget.dataset.city));
		}
	}, [props.history, dispatch]);

	// Отрисовка найденного города и далее запихиваю их в список с найденными городами
	const selectedCityJSX = historySearch.map((el: any) =>
		<li
			key={uuidv4()}
			data-city={el.city}
			onClick={setActiveOrDeleteCity}>
			<p data-active="active" data-city={el.city}>{el.city}, {el.country}</p>
			<button
				className={styles.buttonDelete}
				data-button="delete">
				delete
			</button>
			<p>{el.temperature}&#176;C</p>
		</li>);

	return (
		<div>
			<p className={styles.locationTitle}>Location</p>
			<img className={styles.geoTag} src={geoTagInput} alt="icon geo-tag" />
			<Typeahead
				className={styles.inputTypeahead}
				options={findCities.map((el: any) => `${el.city}, ${el.country}`)}
				placeholder="Search city"
				value={citySelected}
				onChange={searchCities}
				onKeyDown={keyPressEnter}
				onOptionSelected={selectedCityOnOptions} />
			<ul className={styles.historyList}>
				{selectedCityJSX}
			</ul>
		</div>
	);
});

export default withRouter(HistorySearch);