import React  from 'react';
import styles from './Dashboard.module.css';
import Header from '../../components/header/Header';
import NewFilms from '../../components/newFilms/NewFilms';
import Films from '../../components/films/Films';

const Dashboard = () => {
;


   
  return (
    <div className={styles.container}>
      <Header/>
      <NewFilms/>
      <Films/>
    </div>
  );
};

export default Dashboard;
