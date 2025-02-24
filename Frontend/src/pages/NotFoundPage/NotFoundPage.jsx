import React from 'react';
import { useNavigate } from 'react-router';
import styles from './NotFoundPage.module.scss';

const NotFoundPage = () => {
  const nav = useNavigate();

  return (
    <div className={styles.not}>
      <img 
        src="https://a0.anyrgb.com/pngimg/205/117/illustration-oops-404-error-with-a-broken-robot-internet-browser-server-website-robot-error.png" 
        alt="404 Error" 
      />
      
      <div>
        <button 
          onClick={() => nav(-1)} 
          className={styles.btn} 
        >
          <span className={styles.text}>Textttttt</span>
          <span className={styles.flipfront}>Go Back</span>
          <span className={styles.flipback}>Go Back</span>
        </button>
      </div>
    </div>
  );
};

export default NotFoundPage;
