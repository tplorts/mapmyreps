import React, { PureComponent } from 'react';
import { Route, RouteComponentProps, withRouter } from 'react-router-dom';
import _ from 'lodash';
import 'normalize.css';
import NationalMap from './NationalMap';
import StateDetails from './StateDetails';
import './App.scss';

class App extends PureComponent<RouteComponentProps> {
  render() {
    return (
      <div className="App">
        <NationalMap />
        <Route path="/:postal" component={StateDetails} />
      </div>
    );
  }
}

export default withRouter(App);
