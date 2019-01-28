import { StateFeature, ViewSize } from '../types';
import { getBoundingBoxSize, getBoundingBoxCenter } from '../utilities';

export function stateFromNation(
  stateFeature?: StateFeature,
  viewSize?: ViewSize
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
  const renderSize = {
    width: viewSize.width - 2 * viewSize.padding,
    height: viewSize.height - 2 * viewSize.padding,
  };
  const xScale = renderSize.width / featureSize.width;
  const yScale = renderSize.height / featureSize.height;

  // Scale the feature so that it fits within the desired rendering box
  const choose = xScale > 1 || yScale > 1 ? Math.min : Math.max;
  const scale = choose(xScale, yScale);

  return [
    `translate(${viewCenter.x}, ${viewCenter.y})`,
    `scale(${scale})`,
    `translate(${-featureCenter.x}, ${-featureCenter.y})`,
  ].join(' ');
}
