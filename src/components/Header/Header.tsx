import React from 'react';
import styles from './Header.module.css';
import { useSelector } from 'react-redux';


const Header = () => {

// Решил запихнуть в отдельный компонент, чтобы лучше смотрелось в главном компоненте))
	const backgroundDayNight = useSelector((state: any) => state.weatherState.weather.backgroundDayNight);

	return (
		<span className={`${styles.header} ${backgroundDayNight ? styles.day : styles.night}`}></span>
	);
};

export default Header;