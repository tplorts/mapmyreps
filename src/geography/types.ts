export interface AmericanRegion {
  name: string;
  status: string;
  fips: number;
  postal?: string;
}

export interface AmericanState extends AmericanRegion {
  postal: string;
}

export interface XYPoint {
  x: number;
  y: number;
}

export interface XYSize {
  width: number;
  height: number;
}

export interface ViewSize extends XYSize {
  padding: number;
}

export interface XYBoundingBox {
  bottomLeft: XYPoint;
  topRight: XYPoint;
}

export interface StateFeature extends AmericanState {
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
