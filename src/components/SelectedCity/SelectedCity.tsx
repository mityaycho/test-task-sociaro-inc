import React, { useEffect } from 'react';
import styles from './SelectedCity.module.css';
import geoTag from './../../assets/images/geo-tag.png'
import { useDispatch, useSelector } from 'react-redux';
import { getWeatherTC, dateСonvertation } from '../../redux/weather-reducer';
import WeatherCard from '../WeatherCard/WeatherCard';
import DayWeek from '../DayWeek/DayWeek';


function SelectedCity() {

	const dispatch = useDispatch();
	const state = useSelector((state: any) => state.weatherState)

	useEffect(() => {
		(async () => {
			dispatch(getWeatherTC('Moscow'));
		})()
	}, [dispatch]);

	const weatherCardsJSX = () => {
		let keys = (Object.keys(state) as Array<any>).map(key => key);
		let keysForRender = keys.filter((key) =>
			key !== "success" &&
			key !== "city" &&
			key !== "country" &&
			key !== "error" &&
			key !== "dt");
		let resultParams = keysForRender.map(key => <WeatherCard key={key} name={key} description={state[key]} />);
		debugger
		return resultParams;
	};

	const date = dateСonvertation(state.dt);

	return (
		<div className={styles.selectedCity}>
			<div className={styles.infoHead}>
				<p className={styles.infoDateTime}>{`${date?.day}, ${date?.numberOfMonths} ${date?.month} ${date?.year} | ${date?.hour}:${date?.minute}`}</p>
				<span className={styles.infoCityContainer}>
					<p className={styles.infoCityCountry}>{`${state.city}, ${state.country}`} <img src={geoTag} alt="" /></p>
				</span>
			</div>
			<div className={styles.weatherDescriptionsContainer}>
				{weatherCardsJSX()}
			</div>

			<div className={styles.weekContainer}>
				<DayWeek />
				<DayWeek />
				<DayWeek />
				<DayWeek />
				<DayWeek />
				<DayWeek />
				<DayWeek />
			</div>
		</div>
	);
};

export default SelectedCity;