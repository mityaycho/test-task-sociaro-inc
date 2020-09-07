import React, { useCallback, useEffect } from 'react';
import styles from './SelectedCity.module.css';
import geoTag from './../../assets/images/geo-tag.png';
import { useSelector, useDispatch } from 'react-redux';
import WeatherCard from '../WeatherCard/WeatherCard';
import preloaderIMG from './../../assets/images/preloader.gif'
import { dateСonvertation } from '../../assets/reusableJS';
import { v4 as uuidv4 } from 'uuid';
import DayWeekContainer from '../DayWeekContainer/DayWeekContainer';
import { withRouter } from 'react-router-dom';
import { searchPageAC } from '../../redux/actions';


const SelectedCity = React.memo((props: any) => {

	const dispatch = useDispatch();
	const { weather, weekWeather } = useSelector((state: any) => state.weatherState);

	useEffect(() => {
		dispatch(searchPageAC(true));
	}, [dispatch]);
	
	// Оборачиваю милисекунды в функцию обработчик для более простой обработки
	const date = dateСonvertation(weather.dt);
	// После нажатия на кнопку перехожу на страницу с историей поска
	const changeRoute = useCallback(() => {
		props.history.push('/');
	}, [props.history]);

	// Пробегаюсь по ключам и возвращаю массив, дальше фильтрую по определённм значениям возвращаю новый массив

	const weatherCardsJSX = () => {
		let keys = (Object.keys(weather)).map(key => key);
		let keysForRender = keys.filter((key) =>
			key !== 'success' &&
			key !== 'city' &&
			key !== 'country' &&
			key !== 'error' &&
			key !== 'dt');
		// Пробегаюсь по новому массиву и отрисовываю карточки
		let weatherCardsArray = keysForRender.map(key => key !== 'backgroundDayNight' &&
			<WeatherCard
				key={uuidv4()}
				name={key}
				description={weather[key]}
			/>);

		return weatherCardsArray;
	};

	return (
		<div className={styles.selectedCity}>
			{!weather.success ?
				<img src={preloaderIMG} alt="preloader img" /> :
				<>
					<div className={styles.infoHead}>
						<p className={styles.infoDateTime}>{`${date.day}, ${date.numberOfMonths} ${date.month} ${date.year} | ${date.hour}:${date.minute}`}</p>
						<span className={styles.infoCityContainer} onClick={changeRoute}>
							<p className={styles.infoCityCountry}>{`${weather.city}, ${weather.country}`} <img src={geoTag} alt="icon geo tag" /></p>
						</span>
					</div>
					<div className={styles.weatherDescriptionsContainer}>
						{weatherCardsJSX()}
					</div>
					{/* отрисовка погоды по дням недели (не успел реализовать логику перехода на выбранный день) */}
					<DayWeekContainer dayWeek={weekWeather} />
				</>
			}
		</div>
	);
});

export default withRouter(SelectedCity);