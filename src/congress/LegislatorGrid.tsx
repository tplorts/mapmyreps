import _ from 'lodash';
import React, { PureComponent } from 'react';
import { NavLink, RouteComponentProps, withRouter } from 'react-router-dom';
import { DeepReadonly } from 'utility-types';
import { classNames } from '../utilities/styles';
import { Legislator } from './types';
import styles from './LegislatorGrid.module.scss';

type Props = RouteComponentProps & {
  title: string;
  legislators: DeepReadonly<Legislator[]>;
};

class LegislatorGrid extends PureComponent<Props> {
  get isNoLegislatorSelected() {
    return this.props.match.isExact;
  }

  render = () => (
    <div
      className={classNames([
        styles.root,
        this.isNoLegislatorSelected && styles.noSelection,
      ])}
    >
      <h4>{this.props.title}</h4>
      <div className={styles.grid}>
        {_.map(this.props.legislators, this.renderLegislatorLink)}
      </div>
    </div>
  );

  renderLegislatorLink = (legislator: Legislator) => (
    <NavLink
      to={`${this.props.match.url}/${legislator.urlSegment}`}
      key={legislator.bioguideId}
      className={styles.link}
      activeClassName={styles.selected}
    >
      <div className={`${styles.tile} ${styles[legislator.party]}`}>
        <img
          className={styles.avatar}
          src={legislator.imageUrl}
          title={legislator.fullName}
          alt={legislator.fullName}
        />
      </div>
    </NavLink>
  );
}

export default withRouter(LegislatorGrid);
