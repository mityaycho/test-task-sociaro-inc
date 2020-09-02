import React, { useEffect } from 'react';
import styles from './SelectedCity.module.css';
import geoTag from './../../assets/images/geo-tag.png';
import { useDispatch, useSelector } from 'react-redux';
import { getWeatherTC, dateСonvertation, DAYS } from '../../redux/weather-reducer';
import WeatherCard from '../WeatherCard/WeatherCard';
import DayWeek from '../DayWeek/DayWeek';
import preloaderIMG from './../../assets/images/preloader.gif'


function SelectedCity() {

	const dispatch = useDispatch();
	const state = useSelector((state: any) => state.weatherState);

	useEffect(() => {
		(async () => {
			dispatch(getWeatherTC('Moscow'));
		})()
	}, [dispatch]);

	const weatherCardsJSX = () => {
		let keys = (Object.keys(state)).map(key => key);
		let keysForRender = keys.filter((key) =>
			key !== 'success' &&
			key !== 'city' &&
			key !== 'country' &&
			key !== 'error' &&
			key !== 'dt');

		let weatherCardsArray = keysForRender.map(key => key !== 'backgroundDayNight' &&
			<WeatherCard
				key={key}
				name={key}
				description={state[key]}
			/>);

		return weatherCardsArray;
	};

	const date = dateСonvertation(state.dt);

	const daysJSX = DAYS.map(el => <DayWeek title={el.split('').slice(0, 3).join('')} />);

	return (
		<div className={styles.selectedCity}>
			{!state.success ?
				<img src={preloaderIMG} alt="preloader img" /> :
				<>
					<div className={styles.infoHead}>
						<p className={styles.infoDateTime}>{`${date?.day}, ${date?.numberOfMonths} ${date?.month} ${date?.year} | ${date?.hour}:${date?.minute}`}</p>
						<span className={styles.infoCityContainer}>
							<p className={styles.infoCityCountry}>{`${state.city}, ${state.country}`} <img src={geoTag} alt="icon geo tag" /></p>
						</span>
					</div>
					<div className={styles.weatherDescriptionsContainer}>
						{weatherCardsJSX()}
					</div>

					<div className={styles.weekContainer}>
						{daysJSX}
					</div>
				</>
			}
		</div>
	);
};

export default SelectedCity;