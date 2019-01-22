import { combineReducers } from 'redux';
import atlas from './atlas.reducer';
import scaleFactor from './scaleFactor.reducer';

export default combineReducers({
  atlas,
  scaleFactor,
});
