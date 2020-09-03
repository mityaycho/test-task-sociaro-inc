import React from 'react';
import styles from './SelectedCity.module.css';
import geoTag from './../../assets/images/geo-tag.png';
import { useSelector } from 'react-redux';
import WeatherCard from '../WeatherCard/WeatherCard';
import preloaderIMG from './../../assets/images/preloader.gif'
import { dateСonvertation } from '../../assets/reusableJS';
import { v4 as uuidv4 } from 'uuid';
import DayWeekContainer from '../DayWeekContainer/DayWeekContainer';


const SelectedCity = () => {

	const { weather, weekWeather } = useSelector((state: any) => state.weatherState);

	const weatherCardsJSX = () => {
		let keys = (Object.keys(weather)).map(key => key);
		let keysForRender = keys.filter((key) =>
			key !== 'success' &&
			key !== 'city' &&
			key !== 'country' &&
			key !== 'error' &&
			key !== 'dt');

		let weatherCardsArray = keysForRender.map(key => key !== 'backgroundDayNight' &&
			<WeatherCard
				key={uuidv4()}
				name={key}
				description={weather[key]}
			/>);

		return weatherCardsArray;
	};

	const date = dateСonvertation(weather.dt);

	return (
		<div className={styles.selectedCity}>
			{!weather.success ?
				<img src={preloaderIMG} alt="preloader img" /> :
				<>
					<div className={styles.infoHead}>
						<p className={styles.infoDateTime}>{`${date.day}, ${date.numberOfMonths} ${date.month} ${date.year} | ${date.hour}:${date.minute}`}</p>
						<span className={styles.infoCityContainer}>
							<p className={styles.infoCityCountry}>{`${weather.city}, ${weather.country}`} <img src={geoTag} alt="icon geo tag" /></p>
						</span>
					</div>
					<div className={styles.weatherDescriptionsContainer}>
						{weatherCardsJSX()}
					</div>

					<DayWeekContainer dayWeek={weekWeather}/>
				</>
			}
		</div>
	);
};

export default SelectedCity;