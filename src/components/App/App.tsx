import React from 'react';
import styles from './App.module.css';
import Header from '../Header/Header';
import SelectedCity from '../SelectedCity/SelectedCity';
import { Route } from 'react-router-dom';
import HistorySearch from '../HistorySearch/HistorySearch';
import { useSelector } from 'react-redux';

// Главный компонент с роутами по двум страницам, погоды и истории поиска. И фон, меняется по восходу и закату солнца
const App = () => {

	const searchPageActual = useSelector((state: any) => state.weatherState.searchPage);
	console.log(searchPageActual)
	return (
		<div className={styles.App}>
			<section className={styles.AppContainer}>
				<Header />
				<div className={`${styles.selectedCity} ${searchPageActual ? styles.city : styles.search}`}>
					<Route path="/selectedCity" component={SelectedCity} />
					<Route exact path="/" component={HistorySearch} />
				</div>
			</section>
		</div>
	);
};

export default App;