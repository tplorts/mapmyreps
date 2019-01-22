import { StateType } from 'typesafe-actions';
import rootReducer from './rootReducer';

export type State = StateType<typeof rootReducer>;
