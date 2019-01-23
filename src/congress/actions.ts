import { action } from 'typesafe-actions';
import { StateLegislatorsIndex } from './types';

export const SET_LEGISLATORS = `CONGRESS/LEGISLATORS/SET`;
export function setLegislators(index: StateLegislatorsIndex) {
  return action(SET_LEGISLATORS, index);
}
