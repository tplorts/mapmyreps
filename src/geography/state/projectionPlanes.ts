import { XYSize } from '../types';
import {
  geoAlbers,
  geoMercator,
  geoTransverseMercator,
  geoConicConformal,
  geoAlbersUsa,
  GeoConicProjection,
} from 'd3-geo';
import projectionsRaw from './projections';

const projectionFunctionIndex = {
  albers: geoAlbers,
  merc: geoMercator,
  tmerc: geoTransverseMercator,
  lcc: geoConicConformal,
};

interface IProjectionPlane {
  proj: keyof typeof projectionFunctionIndex;
  rotate?: [number, number] | [number, number, number];
  parallels?: [number, number];
  bounds: number[][];
}

interface IProjectionPlaneIndex {
  [postalCode: string]: IProjectionPlane;
}

const projectionPlaneIndex = (projectionsRaw as unknown) as IProjectionPlaneIndex;

export function getProjection(postalCode: string, viewSize: XYSize) {
  const projectionPlane = projectionPlaneIndex[postalCode.toUpperCase()];
  if (!projectionPlane) {
    return geoAlbersUsa();
  }

  const createProjection = projectionFunctionIndex[projectionPlane.proj];
  const projection = createProjection();

  if (projectionPlane.rotate) {
    projection.rotate(projectionPlane.rotate);
  }

  if (projectionPlane.parallels) {
    const conicProjection = projection as GeoConicProjection;
    conicProjection.parallels(projectionPlane.parallels);
  }

  const b = projectionPlane.bounds;
  const { width, height } = viewSize;
  const s =
    0.9 / Math.max((b[1][0] - b[0][0]) / width, (b[1][1] - b[0][1]) / height);
  const t = [
    (width - s * (b[1][0] + b[0][0])) / 2,
    (height - s * (b[1][1] + b[0][1])) / 2,
  ];
  projection.scale(s).translate(t as [number, number]);

  return projection;
}
