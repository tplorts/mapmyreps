import _ from 'lodash';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { NavLink, RouteComponentProps, withRouter } from 'react-router-dom';
import * as Root from '../../rootTypes';
import * as formatters from '../../utilities/formatters';
import { classNames } from '../../utilities/styles';
import { ViewSize } from '../types';
import fetchStateDistricts from './fetchDistricts';
import styles from './Map.module.scss';
import * as selectors from './selectors';
import * as svgTransforms from './svgTransforms';
import SvgDropShadow from './SvgDropShadow';
import { ExtendedDistrictFeature, StateMapProps } from './types';

const viewSize: ViewSize = {
  width: 320,
  height: 320,
  padding: 16,
};

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
};

class StateMap extends PureComponent<Props, ComponentState> {
  state = {
    loaded: false,
    districtFeatures: [],
    districtBorders: '',
  };

  componentDidMount() {
    this.fetchDistrictMap();
  }

  async fetchDistrictMap() {
    const { features, borders } = await fetchStateDistricts(
      this.props.postalCode,
      viewSize
    );

    this.setState({
      loaded: true,
      districtFeatures: features,
      districtBorders: borders,
    });
  }

  render() {
    return (
      <div className={styles.root}>
        <svg
          width={viewSize.width}
          height={viewSize.height}
          className={classNames([
            styles.svgRoot,
            this.state.loaded && styles.loaded,
          ])}
        >
          <defs>
            <SvgDropShadow filterId='stateShadow' />
          </defs>
          <g filter='url(#stateShadow)'>
            {this.state.loaded
              ? this.renderDistricts()
              : this.renderInitialStatePath()}
          </g>
        </svg>
      </div>
    );
  }

  renderInitialStatePath() {
    const { stateFeature } = this.props;

    return stateFeature ? (
      <path d={stateFeature.pathString} transform={this.svgTransformInitial} />
    ) : null;
  }

  renderDistricts() {
    return (
      <g>
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
          />
        </g>
      </NavLink>
    );
  };

  public get svgTransformInitial(): string {
    return svgTransforms.stateFromNation(this.props.stateFeature, viewSize);
  }
}

const reduxConnected = connect(mapStateToProps);

export default withRouter(reduxConnected(StateMap));
