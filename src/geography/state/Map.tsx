import _ from 'lodash';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { NavLink, RouteComponentProps, withRouter } from 'react-router-dom';
import { AutoFitSvg, SvgDropShadow } from '../../components';
import * as Root from '../../rootTypes';
import * as formatters from '../../utilities/formatters';
import { classNames } from '../../utilities/styles';
import { XYSize, XYBoundingBox } from '../types';
import fetchStateDistricts from './fetchDistricts';
import styles from './Map.module.scss';
import * as selectors from './selectors';
import * as svgTransforms from './svgTransforms';
import { ExtendedDistrictFeature, StateMapProps } from './types';

const initialSize = { width: 320, height: 320 };

const mapStateToProps = (root: Root.State, ownProps: StateMapProps) => {
  return {
    stateFeature: selectors.getStateFeature(root, ownProps),
    districtIndex: selectors.getDistrictLinkIndex(root, ownProps),
  };
};

type Props = RouteComponentProps &
  ReturnType<typeof mapStateToProps> &
  StateMapProps;

type ComponentState = {
  loaded: boolean;
  districtFeatures: ExtendedDistrictFeature[];
  districtBorders: string;
  stateBounds: XYBoundingBox;
  focussedDistrictFeature: ExtendedDistrictFeature | null;
  svgSize: XYSize;
};

class StateMap extends PureComponent<Props, ComponentState> {
  state = {
    loaded: false,
    districtFeatures: [],
    districtBorders: '',
    stateBounds: { min: { x: 0, y: 0 }, max: { x: 1, y: 1 } },
    focussedDistrictFeature: null,
    svgSize: initialSize,
  };

  componentDidMount() {
    this.fetchDistrictMap();
  }

  async fetchDistrictMap() {
    const { features, borders, bounds } = await fetchStateDistricts(
      this.props.postalCode,
      this.state.svgSize
    );

    this.setState({
      loaded: true,
      districtFeatures: features,
      districtBorders: borders,
      stateBounds: bounds,
    });
  }

  get svgTransformInitial() {
    return svgTransforms.stateFromNation(
      this.props.stateFeature,
      this.state.svgSize
    );
  }

  zoomToDistrict = (feature: ExtendedDistrictFeature) => {
    this.setState({ focussedDistrictFeature: feature });
  };

  resetZoom = () => {
    this.setState({ focussedDistrictFeature: null });
  };

  onSvgResize = (newSize: XYSize) => {
    this.setState({ svgSize: newSize });
  };

  onSelectDistrict = (feature: ExtendedDistrictFeature) => {
    this.zoomToDistrict(feature);
  };

  get districtMapTransform() {
    const { focussedDistrictFeature } = this.state;
    const focussedFeature = focussedDistrictFeature || {
      bounds: this.state.stateBounds,
    };

    return focussedFeature
      ? svgTransforms.districtZoom(focussedFeature, this.state.svgSize)
      : '';
  }

  render() {
    return (
      <div className={styles.root}>
        <AutoFitSvg
          initialSize={initialSize}
          rootClassName={styles.svgWrapper}
          svgClassName={classNames([
            styles.svgRoot,
            this.state.loaded && styles.loaded,
          ])}
          onResize={this.onSvgResize}
        >
          <defs>
            <SvgDropShadow filterId='stateShadow' />
          </defs>
          <g filter='url(#stateShadow)'>
            {this.state.loaded
              ? this.renderDistricts()
              : this.renderInitialStatePath()}
          </g>
        </AutoFitSvg>
        <div className={styles.controls}>
          {/* <button onClick={this.zoomToDistrict}>+</button> */}
          {!!this.state.focussedDistrictFeature && (
            <button onClick={this.resetZoom}>reset zoom</button>
          )}
        </div>
      </div>
    );
  }

  renderInitialStatePath() {
    const { stateFeature } = this.props;

    return stateFeature ? (
      <path d={stateFeature.path} transform={this.svgTransformInitial} />
    ) : null;
  }

  renderDistricts() {
    return (
      <g className={styles.districtMap} transform={this.districtMapTransform}>
        <g>{_.map(this.state.districtFeatures, this.renderDistrictFeature)}</g>
        <path d={this.state.districtBorders} className={styles.borders} />
      </g>
    );
  }

  renderDistrictFeature = (feature: ExtendedDistrictFeature) => {
    const { districtId } = feature;
    const rep = this.props.districtIndex[districtId];
    const relativePath = rep ? `/${rep.urlSegment}` : '';

    return (
      <NavLink
        to={`${this.props.match.url}${relativePath}`}
        key={districtId}
        activeClassName={styles.selected}
      >
        <g>
          <title>
            {formatters.district(districtId)} District
            {rep ? '' : ' (presently vacant)'}
          </title>
          <path
            className={classNames([styles.district, rep && styles[rep.party]])}
            d={feature.path}
            onClick={() => this.onSelectDistrict(feature)}
          />
        </g>
      </NavLink>
    );
  };
}

const reduxConnected = connect(mapStateToProps);

export default withRouter(reduxConnected(StateMap));
