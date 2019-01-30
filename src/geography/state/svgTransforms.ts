import { StateFeature, XYSize, XYBoundingBox } from '../types';
import { getBoundingBoxSize, getBoundingBoxCenter } from '../utilities';
import { ExtendedDistrictFeature } from './types';

export function stateFromNation(
  stateFeature?: StateFeature,
  viewSize?: XYSize
) {
  if (!stateFeature || !viewSize) {
    return '';
  }

  const featureCenter = getBoundingBoxCenter(stateFeature.bounds);
  const featureSize = getBoundingBoxSize(stateFeature.bounds);

  const viewCenter = {
    x: viewSize.width / 2,
    y: viewSize.height / 2,
  };

  const xScale = viewSize.width / featureSize.width;
  const yScale = viewSize.height / featureSize.height;

  // Scale the feature so that it fits within the desired rendering box
  const choose = xScale > 1 || yScale > 1 ? Math.min : Math.max;
  const scale = 0.9 * choose(xScale, yScale);

  const transforms = [
    `translate(${viewCenter.x}, ${viewCenter.y})`,
    `scale(${scale})`,
    `translate(${-featureCenter.x}, ${-featureCenter.y})`,
  ];
  return transforms.join(' ');
}

export function districtZoom(
  feature: { bounds: XYBoundingBox } | null,
  viewSize: XYSize,
  zoom: number = 0.9
) {
  if (!feature) {
    return '';
  }

  const { bounds } = feature;

  const featureCenter = getBoundingBoxCenter(bounds);
  const featureSize = getBoundingBoxSize(bounds);

  const viewCenter = {
    x: viewSize.width / 2,
    y: viewSize.height / 2,
  };

  const xScale = viewSize.width / featureSize.width;
  const yScale = viewSize.height / featureSize.height;

  const scaleFactor = zoom * Math.min(xScale, yScale);

  const transforms = [
    `translate(${viewCenter.x}, ${viewCenter.y})`,
    `scale(${scaleFactor})`,
    `translate(${-featureCenter.x}, ${-featureCenter.y})`,
  ];
  return transforms.join(' ');
}
