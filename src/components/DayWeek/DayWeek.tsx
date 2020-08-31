import React from 'react';
import styles from './DayWeek.module.css';


type IProps = {
	title: string;
}

function DayWeek(props: IProps) {

  return (
    <div className={styles.dayWeek}>
      <p>{props.title}</p>
    </div>
  );
};

export default DayWeek;