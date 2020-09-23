import React, { useCallback } from 'react';
import styles from './DayWeekContainer.module.css';
import { WeekWeatherType } from '../../redux/weather-reducer';
import DayWeek from './DayWeek/DayWeek';
import { v4 as uuidv4 } from 'uuid';

// Отрисовка оболочки для дней недели
const DayWeekContainer = React.memo((props: any) => {
	const weekData = props.dayWeek;
	const weekWeatherJSX = useCallback(() => {
		return weekData.map((el: WeekWeatherType) => <DayWeek key={uuidv4()} day={el} />);
	}, [weekData]);

	return (
		<div className={styles.dayWeekContainer}>
			{weekWeatherJSX()}
		</div>
	);
});

export default DayWeekContainer;