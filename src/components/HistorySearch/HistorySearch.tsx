import React from 'react';
import styles from './HistorySearch.module.css';


type IProps = {
	title: string;
}

const SearchHistory = React.memo((props: IProps) => {

  return (
    <div className={styles.searchHistoryContainer}>
      hi
    </div>
  );
});

export default SearchHistory;