import _ from 'lodash';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { NavLink, RouteComponentProps, withRouter } from 'react-router-dom';
import { AutoFitSvg } from '../../components';
import * as Root from '../../rootTypes';
import { StateFeature, XYSize } from '../types';
import styles from './Map.module.scss';
import * as selectors from './selectors';
import { SettingsPanel } from './settings';

const mapStateToProps = (root: Root.State) => ({
  atlas: selectors.getAtlas(root),
  stateColors: selectors.getStateColorIndex(root),
});

type Props = RouteComponentProps & ReturnType<typeof mapStateToProps>;
interface State {
  scaleFactor: number;
}

class NationalMap extends PureComponent<Props, State> {
  state = {
    scaleFactor: 1,
  };

  get svgTransform() {
    const { atlas } = this.props;
    if (!atlas) {
      return '';
    }

    const { offset } = atlas;

    return [
      `scale(${this.state.scaleFactor})`,
      `translate(${offset.x} ${offset.y})`,
    ].join(' ');
  }

  private getStateColor(statePostalCode: string) {
    return this.props.stateColors[statePostalCode];
  }

  onSvgResize = (newSize: XYSize) => {
    const { atlas } = this.props;
    if (atlas) {
      this.setState({ scaleFactor: newSize.width / atlas.size.width });
    }
  };

  render = () => (
    <div className='container'>
      {this.renderSvg()}
      <div className={styles.settings}>
        <p className={styles.prodNote}>Will be hidden in production</p>
        <SettingsPanel />
      </div>
    </div>
  );

  renderSvg() {
    const { atlas } = this.props;
    if (!atlas) {
      return null;
    }

    return (
      <AutoFitSvg
        svgClassName={styles.svgRoot}
        initialSize={atlas.size}
        preserveAspectRatio
        onResize={this.onSvgResize}
      >
        <g className={styles.nation} transform={this.svgTransform}>
          <g className={styles.states}>
            {_.map(atlas.features, this.renderStatePath)}
          </g>
          <path className={styles.stateBorders} d={atlas.borders} />
        </g>
      </AutoFitSvg>
    );
  }

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
