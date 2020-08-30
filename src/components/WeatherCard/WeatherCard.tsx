import React from 'react';
import styles from './WeatherCard.module.css';
import humidity from './../../assets/images/humidity.png';
import barometer from './../../assets/images/barometer.png'
import wind from './../../assets/images/wind.png';
import cloudyClear from './../../assets/images/cloudy-clear.png';
import cloudy from './../../assets/images/cloudy.png';
import clock from './../../assets/images/sand-clock.png';
import sunrise from './../../assets/images/sunrise.png';
import sunset from './../../assets/images/sunset.png';


const WeatherCard = (props: any) => {
	let iconSrc, unit;
	let cls = '';
	switch (props.name) {
		case "pressure": {
			iconSrc = barometer;
			unit = "mBar";
			break;
		}
		case "humidity": {
			iconSrc = humidity;
			unit = "%";
			break;
		}
		case "wind": {
			iconSrc = wind;
			unit = "km/h";
			break;
		}
		case "clouds": {
			iconSrc = cloudy;
			break;
		}
		case "daytime": {
			iconSrc = clock;
			unit = "H";
			break;
		}
		case "sunrise": {
			iconSrc = sunrise;
			unit = "AM";
			break;
		}
		case "sunset": {
			iconSrc = sunset;
			unit = "PM";
			break;
		}
		case "description": {
			iconSrc = cloudyClear;
			break;
		}
		case "temperature": {
			cls = "degrees";
			break;
		}
		default: {
			iconSrc = undefined
		}
	}


	let descriptionTitle = typeof props.description !== 'object'
		? props.description
		: `${props.description.temp_max} ${props.description.temp_min}`

	return (
		<div className={styles.weatherCard}>
			{
				props.name !== "temperature" && 
				<span className={styles.blockIconImg}>
					{props.name !== "temperatureChange" && <img src={iconSrc} alt="img" />}
				</span>
			}

			<span className={styles[cls]}>{descriptionTitle} {!!unit && unit}</span>
			{
				props.name !== "temperature" &&
				props.name !== "description" &&
				props.name !== "temperatureChange" ?
				<span>{props.name}</span> :
				<span></span>
			}
		</div>
	)
}

export default WeatherCard;