import { action } from 'typesafe-actions';
import { ColoringChamber } from './types';

export const SET_COLOR_SPACE = `GEOGRAPHY/NATION/SETTINGS/COLOR_SPACE/SET`;
export const setColorSpace = (colorSpace: string) =>
  action(SET_COLOR_SPACE, colorSpace);

export const SET_COLORING_CHAMBER = `GEOGRAPHY/NATION/SETTINGS/COLORING_CHAMBER/SET`;
export const setColoringChamber = (chamber: ColoringChamber) =>
  action(SET_COLORING_CHAMBER, chamber);
