import { action } from 'typesafe-actions';
import { NationalAtlas } from './types';

export const SET_NATIONAL_ATLAS = `GEOGRAPHY/NATION/SET_ATLAS`;
export const setNationalAtlas = (atlas: NationalAtlas) =>
  action(SET_NATIONAL_ATLAS, atlas);

export const SET_MAP_SCALE_FACTOR = `GEOGRAPHY/NATION/SET_MAP_SCALE_FACTOR`;
export const setMapScaleFactor = (factor: number) =>
  action(SET_MAP_SCALE_FACTOR, factor);
