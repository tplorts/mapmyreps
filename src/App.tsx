import React from 'react';
import { Route } from 'react-router-dom';
import _ from 'lodash';
import 'normalize.css';
import MainHeader from './header/MainHeader';
import NationalMap from './geography/nation/Map';
import About from './about/About';
import StateView from './congress/StateView';
import styles from './App.module.scss';

const App = () => (
  <div className={styles.root}>
    <MainHeader />
    <div className={styles.content}>
      <NationalMap />
    </div>
    <Route path='/about' exact component={About} />
    <Route path='/:postal([A-Za-z]{2})' component={StateView} />
  </div>
);

export default App;
