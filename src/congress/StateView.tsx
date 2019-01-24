import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter, Link, Route } from 'react-router-dom';
import { getStateNameForPostal } from '../geography/USARegions';
import * as Root from '../rootTypes';
import * as selectors from './selectors';
import LegislatorGrid from './LegislatorGrid';
import LegislatorView from './LegislatorView';
import styles from './StateView.module.scss';

export interface RouteParams {
  postal: string;
}

export type RouteProps = RouteComponentProps<RouteParams>;

const mapStateToProps = (state: Root.State, ownProps: RouteProps) => ({
  senators: selectors.getSenatorsForState(state, ownProps),
  representatives: selectors.getRepresentativesForState(state, ownProps),
});

type Props = RouteProps & ReturnType<typeof mapStateToProps>;

class StateView extends PureComponent<Props> {
  get stateName() {
    return getStateNameForPostal(this.props.match.params.postal);
  }

  render() {
    return (
      <div className={`container ${styles.root}`}>
        <div className={styles.overview}>
          <div className={styles.title}>
            <Link to='/'>Back</Link>
            <h4>{this.stateName}</h4>
          </div>
          <div className={styles.map} />
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
    );
  }
}

const reduxConnected = connect(mapStateToProps);

export default withRouter(reduxConnected(StateView));
