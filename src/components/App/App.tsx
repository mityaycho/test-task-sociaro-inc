import React from 'react';
import styles from './App.module.css';
import { useDispatch } from 'react-redux';
import { getWeatherTC } from '../../redux/reducers';

function App() {

	const dispatch = useDispatch();

	const getWeather = (e: string) => {
		dispatch(getWeatherTC(e));
	};

  return (
    <div className={styles.App}>
      <header className={styles.AppHeader}>
				<input type="text" onChange={(e) => getWeather(e.currentTarget.value)}/>
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
      </header>
    </div>
  );
};

export default App;