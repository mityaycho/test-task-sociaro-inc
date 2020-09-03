import React from 'react';
import styles from './HistorySearch.module.css';
import { useSelector } from 'react-redux';


const SearchHistory = () => {

	const selectedCityData = useSelector((state: any) => state.weatherState.selectedCity);

	const selectedCityJSX = selectedCityData.map((el: any) =>
		<li className={styles.historyCity}>
			<p>{el.city}, {el.country}</p>
			<p>{el.temperature}&#176;C</p>
		</li>);

	return (
		<div className={styles.searchHistoryContainer}>
			<ul className={styles.historyList}></ul>
			{selectedCityJSX}
		</div>
	);
};

export default SearchHistory;