import React from 'react';
import styles from './App.module.css';
import Header from '../Header/Header';
import SelectedCity from '../SelectedCity/SelectedCity';
import { Route } from 'react-router-dom';
import SearchHistory from '../HistorySearch/HistorySearch';

function App() {

	return (
		<div className={styles.App}>
			<section className={styles.AppContainer}>
				<Header />
				<Route exact path="/" />
				<Route path="/selectedCity" component={SelectedCity} />
				<Route path="/historySearch" component={SearchHistory} />
			</section>
		</div>
	);
};

export default App;