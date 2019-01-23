import { combineReducers } from 'redux';
import congress from './congress/reducer';
import geography from './geography/reducer';

export default combineReducers({
  congress,
  geography,
});
