
import { combineReducers } from 'redux';
import legislators from './legislators.reducer';
import partyStats from './partyStats.reducer';

export default combineReducers({
  legislators,
  partyStats,
});
