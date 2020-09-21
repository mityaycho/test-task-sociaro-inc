import React from 'react';
import styles from './WeatherCard.module.css';
import humidity from './../../assets/images/humidity.png';
import barometer from './../../assets/images/barometer.png';
import wind from './../../assets/images/wind.png';
import cloudyClearDay from './../../assets/images/cloudy-clear-day.png';
import cloudyClearNight from './../../assets/images/cloudy-clear-night.png';
import cloudy from './../../assets/images/cloudy.png';
import clock from './../../assets/images/sand-clock.png';
import sunrise from './../../assets/images/sunrise.png';
import sunset from './../../assets/images/sunset.png';
import { useSelector } from 'react-redux';

interface Idescription {
	temp_max: number;
	temp_min: number;
};

type WeatherCardPropsType = {
	key: string;
	name: string;
	description: Idescription;
};
// Карточка погоды
const WeatherCard = React.memo((props: WeatherCardPropsType) => {
	
	// Достаю из Редакс проверку отрисовки фона и иконки (день\ночь)
	const backgroundDayNight = useSelector((state: any) => state.weatherState.backgroundDayNight);

	// Делаю проверку на входные данные и меняю иконки и цсс стили
	let iconSrc, unit;
	let cls = '';
	switch (props.name) {
		case 'pressure': {
			iconSrc = barometer;
			unit = 'mBar';
			break;
		}
		case 'humidity': {
			iconSrc = humidity;
			unit = '%';
			break;
		}
		case 'wind': {
			iconSrc = wind;
			unit = 'km/h';
			break;
		}
		case 'clouds': {
			iconSrc = cloudy;
			break;
		}
		case 'daytime': {
			iconSrc = clock;
			unit = 'H';
			break;
		}
		case 'sunrise': {
			iconSrc = sunrise;
			unit = 'AM';
			break;
		}
		case 'sunset': {
			iconSrc = sunset;
			unit = 'PM';
			break;
		}
		case 'description': {
			backgroundDayNight ?
				iconSrc = cloudyClearDay :
				iconSrc = cloudyClearNight;
			break;
		}
		case 'temperature': {
			cls = 'degrees';
			break;
		}
		case 'temperatureChange': {
			cls = 'tempMinMaxContainer';
			break;
		}
		default: {
			iconSrc = undefined
		}
	};

	// Отрисовка главной иконки с погодой
	let descriptionTitle = typeof props.description !== 'object' ?
		props.description :
		<div className={styles.tempMinMax}>
			<p>{props.description.temp_max}</p>
			<p>{props.description.temp_min}</p>
		</div>;

	return (
		<div className={styles.weatherCard}>
			{
				props.name !== 'temperature' &&
				props.name !== 'temperatureChange' &&
				<span className={props.name !== 'description' ? styles.icon : styles.backgroundDayNightIMG}>
					<img src={iconSrc} alt={`icon ${props.name}`} />
				</span>
			}

			<span className={styles[cls]}>{descriptionTitle} {!!unit && unit}</span>
			{
				props.name !== 'temperature' &&
					props.name !== 'description' &&
					props.name !== 'temperatureChange' ?
					<span>{props.name}</span> :
					<span></span>
			}
		</div>
	);
});

export default WeatherCard;