import { combineReducers } from 'redux';
import { createBasicSetValueReducer } from '../../../utilities/createReducer';
import * as actions from './actions';
import { ColoringChamber } from './types';

export default combineReducers({
  colorSpace: createBasicSetValueReducer<string>(
    'lrgb',
    actions.SET_COLOR_SPACE
  ),
  coloringChamber: createBasicSetValueReducer<ColoringChamber>(
    'combined',
    actions.SET_COLORING_CHAMBER
  ),
});
