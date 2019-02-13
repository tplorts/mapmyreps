import { combineReducers } from 'redux';
import { createBasicSetValueReducer } from '../../utilities/createReducer';
import { NationalAtlas } from '../types';
import * as actions from './actions';
import settings from './settings/reducer';

export default combineReducers({
  settings,
  atlas: createBasicSetValueReducer<NationalAtlas | null>(
    null,
    actions.SET_NATIONAL_ATLAS
  ),
});
