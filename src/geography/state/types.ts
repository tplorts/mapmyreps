import { Feature, Geometry } from 'geojson';
import { GeometryCollection, Topology } from 'topojson-specification';
import { Representative } from '../../congress/types';
import { XYBoundingBox } from '../types';

export interface StateMapProps {
  postalCode: string;
  representatives: Representative[];
}

export interface DistrictProperties {
  AFFGEOID: string;
  ALAND: number;
  AWATER: number;
  CD115FP: string;
  CDSESSN: string;
  GEOID: string;
  LSAD: string;
  STATEFP: string;
}

export type CongressionalDistrictsTopology = Topology<{
  districts: GeometryCollection<DistrictProperties>;
}>;

export type DistrictFeature = Feature<Geometry, DistrictProperties>;

export interface ExtendedDistrictFeature extends DistrictFeature {
  districtId: number;
  path: string;
  bounds: XYBoundingBox;
}
