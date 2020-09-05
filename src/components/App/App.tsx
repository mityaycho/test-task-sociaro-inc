import React from 'react';
import styles from './App.module.css';
import Header from '../Header/Header';
import SelectedCity from '../SelectedCity/SelectedCity';
import { Route } from 'react-router-dom';
import HistorySearch from '../HistorySearch/HistorySearch';

const App = () => {
// Главный компонент с роутами по двум страницам, погоды и истории поиска. И фон, меняется по восходу и закату солнца
	return (
		<div className={styles.App}>
			<section className={styles.AppContainer}>
				<Header />
				<div className={styles.selectedCity}>
					<Route path="/selectedCity" component={SelectedCity} />
					<Route exact path="/" component={HistorySearch} />
				</div>
			</section>
		</div>
	);
};

export default App;