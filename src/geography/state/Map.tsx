import _ from 'lodash';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { NavLink, RouteComponentProps, withRouter } from 'react-router-dom';
import * as Root from '../../rootTypes';
import * as selectors from './selectors';
import styles from './Map.module.scss';
import { StateFeature } from '../types';
import { StateMapProps } from './Props';
import SvgDropShadow from './SvgDropShadow';

const stateMapOptions = {
  width: 320,
  height: 320,
  padding: 16,
};

const mapStateToProps = (root: Root.State, ownProps: StateMapProps) => {
  return {
    stateFeature: selectors.getStateFeature(root, ownProps),
  };
};

type Props = RouteComponentProps &
  ReturnType<typeof mapStateToProps> &
  StateMapProps;

class StateMap extends PureComponent<Props> {
  render() {
    const { stateFeature } = this.props;
    if (_.isNil(stateFeature)) {
      return null;
    }

    return (
      <div className={styles.root}>
        <svg
          width={stateMapOptions.width}
          height={stateMapOptions.height}
          className={styles.svgRoot}
        >
          <defs>
            <SvgDropShadow filterId='stateShadow' />
          </defs>
          <path
            filter='url(#stateShadow)'
            d={stateFeature.pathString}
            transform={this.svgTransformInitial}
          />
        </svg>
      </div>
    );
  }

  renderStatePath = (state: StateFeature) => (
    <NavLink
      to={`/${state.postal}`}
      key={state.postal}
      activeClassName={styles.selected}
    >
      <path className={styles.state} d={state.pathString} />
    </NavLink>
  );

  public get svgTransformInitial(): string {
    const { stateFeature } = this.props;
    if (_.isNil(stateFeature)) {
      return '';
    }

    const { topRight, bottomLeft } = stateFeature.bounds;
    const { x: x0, y: y0 } = bottomLeft;
    const { x: x1, y: y1 } = topRight;
    const [x, y] = [(x0 + x1) / 2, (y0 + y1) / 2];
    const stateWidth = x1 - x0;
    const stateHeight = y1 - y0;
    const { width, height, padding } = stateMapOptions;
    const mapCenterX = width / 2;
    const mapCenterY = height / 2;
    const mapWidth = width - 2 * padding;
    const mapHeight = height - 2 * padding;
    const xScale = mapWidth / stateWidth;
    const yScale = mapHeight / stateHeight;
    const choose = xScale > 1 || yScale > 1 ? Math.min : Math.max;
    const scale = choose(xScale, yScale);

    return [
      `translate(${mapCenterX}, ${mapCenterY})`,
      `scale(${scale})`,
      `translate(${-x}, ${-y})`,
    ].join(' ');
  }
}

const reduxConnected = connect(mapStateToProps);

export default withRouter(reduxConnected(StateMap));
