import { action } from 'typesafe-actions';
import { NationalAtlas } from '../types';

export const SET_NATIONAL_ATLAS = `GEOGRAPHY/NATION/SET_ATLAS`;
export const setNationalAtlas = (atlas: NationalAtlas) =>
  action(SET_NATIONAL_ATLAS, atlas);
