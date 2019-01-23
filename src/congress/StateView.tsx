import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter, Link } from 'react-router-dom';
import { getStateNameForPostal } from '../geography/USARegions';
import * as Root from '../rootTypes';
import * as selectors from './selectors';
import LegislatorGrid from './LegislatorGrid';
import styles from './StateView.module.scss';

interface StateRouteParams {
  postal: string;
}

type RouteProps = RouteComponentProps<StateRouteParams>;

const mapStateToProps = (state: Root.State, ownProps: RouteProps) => ({
  legislators: selectors.getLegislatorsForState(
    state,
    ownProps.match.params.postal
  ),
});

type Props = RouteProps & ReturnType<typeof mapStateToProps>;

class StateView extends PureComponent<Props> {
  get stateName() {
    return getStateNameForPostal(this.props.match.params.postal);
  }

  render() {
    return (
      <div className={styles.root}>
        <div className={styles.overview}>
          <div className={styles.title}>
            <Link to='/'>Back</Link>
            <h4>{this.stateName}</h4>
          </div>
          <div className={styles.map} />
          <div className={styles.legislators}>
            <LegislatorGrid title='Senators' legislators={[]} />
            <LegislatorGrid
              title='Representatives'
              legislators={this.props.legislators}
            />
          </div>
        </div>
        <div className={styles.legislatorDetails} />
      </div>
    );
  }
}

const reduxConnected = connect(mapStateToProps);

export default withRouter(reduxConnected(StateView));
