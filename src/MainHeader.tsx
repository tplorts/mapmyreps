import React from 'react';
import { Link } from 'react-router-dom';
import ShareMenu from './ShareMenu';
import styles from './MainHeader.module.scss';

const MainHeader = () => (
  <header className={styles.header}>
    <div className={`container ${styles.content}`}>
      <Link className={styles.link} to='/about'>
        More
      </Link>
      <h1>
        <Link to='/'>Map My Reps</Link>
      </h1>
      <ShareMenu />
    </div>
  </header>
);

export default MainHeader;
