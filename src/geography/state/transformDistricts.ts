import { GeoPath, geoPath } from 'd3-geo';
import _ from 'lodash';
import { feature, mesh } from 'topojson';
import { XYSize } from '../types';
import { bboxToXYBoundingBox, getNetBoundingBox } from '../utilities';
import { getProjection } from './projectionPlanes';
import { CongressionalDistrictsTopology } from './types';

export default function transformDistricts(
  districtsTopology: CongressionalDistrictsTopology,
  statePostalCode: string,
  mapViewSize: XYSize
) {
  const projection = getProjection(statePostalCode, mapViewSize);
  const path: GeoPath<any, any> = geoPath(projection);

  const { districts } = districtsTopology.objects;
  const { features } = feature(districtsTopology, districts);

  const extendedFeatures = _.map(features, districtFeature => ({
    ...districtFeature,
    districtId: _.toNumber(districtFeature.properties.CD115FP),
    path: path(districtFeature) || '',
    bounds: bboxToXYBoundingBox(path.bounds(districtFeature)),
  }));

  return {
    borders: path(mesh(districtsTopology, districts)) || '',
    features: extendedFeatures,
    bounds: getNetBoundingBox(extendedFeatures),
  };
}
