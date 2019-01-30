import _ from 'lodash';
import { TopoJSONBBox, XYBoundingBox, XYPoint, XYSize } from './types';

export function bboxToXYBoundingBox(bbox: TopoJSONBBox): XYBoundingBox {
  const [min, max] = bbox;
  return {
    min: { x: min[0], y: min[1] },
    max: { x: max[0], y: max[1] },
  };
}

export function getBoundingBoxCenter(boundingBox: XYBoundingBox): XYPoint {
  const { max, min } = boundingBox;

  return {
    x: (min.x + max.x) / 2,
    y: (min.y + max.y) / 2,
  };
}

export function getBoundingBoxSize(boundingBox: XYBoundingBox): XYSize {
  const { max, min } = boundingBox;

  return {
    width: max.x - min.x,
    height: max.y - min.y,
  };
}

export function getNetBoundingBox(
  boundedFeatures: Array<{ bounds: XYBoundingBox }>
): XYBoundingBox {
  return {
    min: {
      x: _.min(_.map(boundedFeatures, feature => feature.bounds.min.x)) || 0,
      y: _.min(_.map(boundedFeatures, feature => feature.bounds.min.y)) || 0,
    },
    max: {
      x: _.max(_.map(boundedFeatures, feature => feature.bounds.max.x)) || 0,
      y: _.max(_.map(boundedFeatures, feature => feature.bounds.max.y)) || 0,
    },
  };
}
