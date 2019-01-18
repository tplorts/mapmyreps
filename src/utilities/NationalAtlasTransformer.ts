import { GeoPath, geoPath } from 'd3-geo';
import { feature, mesh, UsAtlas } from 'topojson';
import _ from 'lodash';
import { USARegion, getStateByFIPS, USAState } from './USARegions';
import { Feature } from 'geojson';

export interface XYPoint {
  x: number;
  y: number;
}

export interface XYBoundingBox {
  bottomLeft: XYPoint;
  topRight: XYPoint;
}

export interface StateFeature extends USAState {
  pathString: string;
  centroid: XYPoint;
  bounds: XYBoundingBox;
}

export class NationalAtlasTransformer {
  private topology: UsAtlas;
  private path: GeoPath;

  constructor(topology: UsAtlas) {
    this.topology = topology;
    this.path = geoPath();
  }

  getStateBordersPathString = () => {
    const meshString = mesh(
      this.topology,
      this.topology.objects.states,
      (a, b) => a !== b
    );

    return this.path(meshString);
  };

  getStateFeatures = () => {
    const { features } = feature(this.topology, this.topology.objects.states);

    return _.chain(features)
      .map(this.transformStateFeature)
      .orderBy(['name'], ['asc'])
      .value();
  };

  transformStateFeature = (feature: Feature) => ({
    ...getStateByFIPS(_.toNumber(feature.id)),
    pathString: this.getPathString(feature),
    centroid: this.getFeatureCentroid(feature),
    bounds: this.getFeatureBounds(feature),
  });

  getSize = () => {
    const [left, top, right, bottom] = this.topology.bbox;

    return {
      width: right - left,
      height: bottom - top,
    };
  };

  getOffset = () => {
    const [left, top] = this.topology.bbox;

    return {
      x: -left,
      y: -top,
    };
  };

  private getPathString = (feature: Feature) => this.path(feature);

  private getFeatureCentroid = (feature: Feature): XYPoint => {
    const [x, y] = this.path.centroid(feature);

    return { x, y };
  };

  private getFeatureBounds = (feature: Feature): XYBoundingBox => {
    const [[x0, y0], [x1, y1]] = this.path.bounds(feature);

    return {
      bottomLeft: { x: x0, y: y0 },
      topRight: { x: x1, y: y1 },
    };
  };
}
