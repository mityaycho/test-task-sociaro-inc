import React from 'react';
import styles from './CheckedCity.module.css';


function CheckedCity() {

  return (
    <div className={styles.checkedCity}>
			<div className={styles.infoHead}>
				<span className={styles.infoDateTime}>Sunday, 19 May 2019 | 4:30PM</span>
				<span className={styles.infoCityCountry}>Mumbai, India</span>
			</div>
      
    </div>
  );
};

export default CheckedCity;