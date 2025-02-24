import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styles from './Dashboard.module.css';
import Header from '../../components/header/Header';
import NewFilms from '../../components/newFilms/NewFilms';
import Films from '../../components/films/Films';

const Dashboard = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();


   
  return (
    <div className={styles.container}>
      <Header/>
      <NewFilms/>
      <Films/>
    </div>
  );
};

export default Dashboard;
