import { USAState } from './USARegions';

export interface XYPoint {
  x: number;
  y: number;
}

export interface XYSize {
  width: number;
  height: number;
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

export interface NationalAtlas {
  features: StateFeature[];
  borders: string;
  size: XYSize;
  offset: XYPoint;
}
