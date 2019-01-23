import _ from 'lodash';
import React, { PureComponent } from 'react';
import { NavLink, RouteComponentProps, withRouter } from 'react-router-dom';
import { DeepReadonly } from 'utility-types';
import styles from './LegislatorGrid.module.scss';
import { Legislator } from './types';

type Props = RouteComponentProps & {
  title: string;
  legislators: DeepReadonly<Legislator[]>;
};

class LegislatorGrid extends PureComponent<Props> {
  render = () => (
    <div>
      <h4>{this.props.title}</h4>
      <div className={styles.grid}>
        {_.map(this.props.legislators, this.renderLegislatorLink)}
      </div>
    </div>
  );

  renderLegislatorLink = (legislator: Legislator) => (
    <div key={legislator.bioguideId}>
      <NavLink to={legislator.urlSegment}>{legislator.fullName}</NavLink>
    </div>
  );
}

export default withRouter(LegislatorGrid);
