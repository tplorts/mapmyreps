import { combineReducers } from 'redux';
import { createBasicSetValueReducer } from '../utilities/createReducer';
import * as actions from './actions';
import { StateLegislatorsIndex, StatePartyStatsIndex } from './types';

export default combineReducers({
  legislators: createBasicSetValueReducer<StateLegislatorsIndex>(
    {},
    actions.SET_LEGISLATORS
  ),
  partyStats: createBasicSetValueReducer<StatePartyStatsIndex>(
    {},
    actions.SET_PARTY_STATS
  ),
});
