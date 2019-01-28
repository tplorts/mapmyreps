import { combineReducers } from 'redux';
import { createBasicSetValueReducer } from '../../utilities/createReducer';
import { NationalAtlas } from '../types';
import * as actions from './actions';
import settings from './settings/reducer';

export default combineReducers({
  settings,
  atlas: createBasicSetValueReducer<NationalAtlas>(
    {
      features: [],
      borders: '',
      size: {
        width: 0,
        height: 0,
      },
      offset: {
        x: 0,
        y: 0,
      },
    },
    actions.SET_NATIONAL_ATLAS
  ),
  scaleFactor: createBasicSetValueReducer<number>(
    0,
    actions.SET_MAP_SCALE_FACTOR
  ),
});
