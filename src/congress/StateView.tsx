import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link, Route, Redirect, Switch } from 'react-router-dom';
import { getStateNameForPostal } from '../geography/AmericanStates';
import * as Root from '../rootTypes';
import Icon from '../Icon';
import StateMap from '../geography/state/Map';
import * as selectors from './selectors';
import LegislatorGrid from './LegislatorGrid';
import LegislatorView from './LegislatorView';
import styles from './StateView.module.scss';
import { StateRouteProps } from './routes';

const mapStateToProps = (state: Root.State, ownProps: StateRouteProps) => ({
  senators: selectors.getSenatorsForState(state, ownProps),
  representatives: selectors.getRepresentativesForState(state, ownProps),
});

type Props = StateRouteProps & ReturnType<typeof mapStateToProps>;

class StateView extends PureComponent<Props> {
  get stateName() {
    return getStateNameForPostal(this.props.match.params.postal);
  }

  render() {
    return (
      <div className={styles.root}>
        <div className={styles.container}>
          <div className={styles.overview}>
            <div className={styles.title}>
              <Link to='/' className='svg-icon-button'>
                <Icon name='map' />
              </Link>
              <h4>{this.stateName}</h4>
            </div>
            <div className={styles.map}>
              <StateMap
                postalCode={this.props.match.params.postal}
                representatives={this.props.representatives}
              />
            </div>
            <div className={styles.legislators}>
              <LegislatorGrid
                title='Senators'
                legislators={this.props.senators}
              />
              <LegislatorGrid
                title='Representatives'
                legislators={this.props.representatives}
              />
            </div>
          </div>
          <div className={styles.legislatorDetails}>
            <Route
              path={`${this.props.match.path}/:bioguideId(\\w+)`}
              component={LegislatorView}
            />
          </div>
        </div>
      </div>
    );
  }
}

const reduxConnected = connect(mapStateToProps);

export default withRouter(reduxConnected(StateView));
