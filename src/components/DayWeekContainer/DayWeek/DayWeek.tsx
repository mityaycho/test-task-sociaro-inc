import React from 'react';
import styles from './DayWeek.module.css';
import fog from '../../../assets/images/fog.png';
import cloudy from '../../../assets/images/cloudy.png';
import sunny from '../../../assets/images/sun.png' ;
import { dateСonvertation } from '../../../assets/reusableJS';


const DayWeek = React.memo((props: any) => {
	const day = props.day;
	const dayName = dateСonvertation(props.day.dt);
	const dayWeek = dayName.day.split('').slice(0, 3).join('');
	const dateDay = dayName.numberOfMonths

	let iconSrc;
	switch (day.weather[0].main) {
		case 'Clouds': {
			iconSrc = cloudy;
			break;
		}
		case 'Rain': {
			iconSrc = fog;
			break;
		}
		case 'Clear': {
			iconSrc = sunny;
			break;
		}
		default: {
			iconSrc = undefined;
			break;
		}
	};

	return (
		<div className={styles.dayWeek}>
			<span className={styles.iconWeather}>
				<img src={iconSrc} alt="icon weather" />
			</span>
			<span className={styles.dayName}>
				{dayWeek}, {dateDay}
			</span>
			<span className={styles.temperatureDay}>
				{Math.round(day.temp.max) - 273} &#176;C&uarr;
				{Math.round(day.temp.min) - 273} &#176;C&darr;
			</span>
		</div>
	);
});

export default DayWeek;