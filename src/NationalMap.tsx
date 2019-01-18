import React, { PureComponent } from 'react';
import { NavLink, withRouter, RouteComponentProps } from 'react-router-dom';
import { UsAtlas } from 'topojson';
import _ from 'lodash';
import {
  StateFeature,
  NationalAtlasTransformer,
} from './utilities/NationalAtlasTransformer';
import { pause } from './utilities/temporal';
import removeAppLoader from './removeAppLoader';
import styles from './NationalMap.module.scss';

class NationalMap extends PureComponent<RouteComponentProps> {
  state = {
    stateFeatures: [],
    stateBordersPath: '',
    scaleFactor: 0,
    gotData: false,
  };

  sourceSize = {
    width: 0,
    height: 0,
  };

  sourceOffset = {
    x: 0,
    y: 0,
  };

  rootInstance: Element | null = null;

  async componentDidMount() {
    const url = 'http://data.mapmyreps.us/geography/us-atlas-10m.json';
    const response = await fetch(url);
    const rawAtlas = (await response.json()) as UsAtlas;
    const transformer = new NationalAtlasTransformer(rawAtlas);

    this.sourceSize = transformer.getSize();
    this.sourceOffset = transformer.getOffset();

    this.setState({
      stateFeatures: transformer.getStateFeatures(),
      stateBordersPath: transformer.getStateBordersPathString(),
      scaleFactor: this.getScaleFactor(),
      gotData: true,
    });

    window.addEventListener('resize', this.onResize);

    removeAppLoader();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize);
  }

  resize = () => {
    this.setState(() => ({
      scaleFactor: this.getScaleFactor(),
    }));
  };

  onResize = _.debounce(this.resize, 200);

  getScaleFactor = () => {
    const xScale = this.rootInstance
      ? this.rootInstance.getBoundingClientRect().width / this.sourceSize.width
      : 1;

    return _.clamp(xScale, 0.2, 1.4);
  };

  get svgTransform() {
    const { x: xMove, y: yMove } = this.sourceOffset;

    return [
      `scale(${this.state.scaleFactor})`,
      `translate(${xMove} ${yMove})`,
    ].join(' ');
  }

  get svgWidth() {
    return this.sourceSize.width * this.state.scaleFactor;
  }

  get svgHeight() {
    return this.sourceSize.height * this.state.scaleFactor;
  }

  setRootInstance = (instance: Element | null) => {
    this.rootInstance = instance;
  };

  render = () => (
    <div className={styles.root} ref={this.setRootInstance}>
      <svg
        width={this.svgWidth}
        height={this.svgHeight}
        className={styles.svgRoot}
      >
        <g className={styles.nation} transform={this.svgTransform}>
          <g className={styles.states}>
            {_.map(this.state.stateFeatures, this.renderStatePath)}
          </g>
          <path
            className={styles.stateBorders}
            d={this.state.stateBordersPath}
          />
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
      <path className={styles.state} d={state.pathString} />
    </NavLink>
  );
}

export default withRouter(NationalMap);
