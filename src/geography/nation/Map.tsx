import _ from 'lodash';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { NavLink, RouteComponentProps, withRouter } from 'react-router-dom';
import * as Root from '../../rootTypes';
import * as selectors from './selectors';
import { StateFeature } from '../types';
import { MAP_ELEMENT_ID } from './constants';
import styles from './Map.module.scss';

const mapStateToProps = (state: Root.State) => {
  const atlas = selectors.getAtlas(state);
  const scaleFactor = selectors.getMapScaleFactor(state);

  return {
    atlas,
    scaleFactor,
    svgWidth: atlas.size.width * scaleFactor,
    svgHeight: atlas.size.height * scaleFactor,
  };
};

type Props = RouteComponentProps & ReturnType<typeof mapStateToProps>;

class NationalMap extends PureComponent<Props> {
  get svgTransform() {
    const { offset } = this.props.atlas;

    return [
      `scale(${this.props.scaleFactor})`,
      `translate(${offset.x} ${offset.y})`,
    ].join(' ');
  }

  render = () => (
    <div className={styles.root} id={MAP_ELEMENT_ID}>
      <svg
        width={this.props.svgWidth}
        height={this.props.svgHeight}
        className={styles.svgRoot}
      >
        <g className={styles.nation} transform={this.svgTransform}>
          <g className={styles.states}>
            {_.map(this.props.atlas.features, this.renderStatePath)}
          </g>
          <path className={styles.stateBorders} d={this.props.atlas.borders} />
        </g>
      </svg>
    </div>
  );

  renderStatePath = (state: StateFeature) => (
    <NavLink
      to={`/${state.postal}`}
      key={state.postal}
      activeClassName={styles.selected}
    >
      <path className={styles.state} d={state.path} />
    </NavLink>
  );
}

const reduxConnected = connect(mapStateToProps);

export default withRouter(reduxConnected(NationalMap));
