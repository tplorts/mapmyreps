import _ from 'lodash';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { NavLink, RouteComponentProps, withRouter } from 'react-router-dom';
import * as Root from '../../rootTypes';
import { StateFeature } from '../types';
import { MAP_ELEMENT_ID } from './constants';
import styles from './Map.module.scss';
import * as selectors from './selectors';
import { SettingsPanel } from './settings';

const mapStateToProps = (root: Root.State) => {
  const atlas = selectors.getAtlas(root);
  const scaleFactor = selectors.getMapScaleFactor(root);

  return {
    atlas,
    scaleFactor,
    svgWidth: atlas.size.width * scaleFactor,
    svgHeight: atlas.size.height * scaleFactor,
    stateColors: selectors.getStateColorIndex(root),
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

  private getStateColor(statePostalCode: string) {
    return this.props.stateColors[statePostalCode];
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
      <div className={styles.settings}>
        <p className={styles.prodNote}>Will be hidden in production</p>
        <SettingsPanel />
      </div>
    </div>
  );

  renderStatePath = (state: StateFeature) => (
    <NavLink
      to={`/${state.postal}`}
      key={state.postal}
      activeClassName={styles.selected}
    >
      <path
        className={styles.state}
        style={{ fill: this.getStateColor(state.postal) }}
        d={state.path}
      />
    </NavLink>
  );
}

const reduxConnected = connect(mapStateToProps);

export default withRouter(reduxConnected(NationalMap));
