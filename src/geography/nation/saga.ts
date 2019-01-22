import { call, put } from 'redux-saga/effects';
import * as service from './service';
import * as actions from './actions';

export function* loadNationalAtlasSaga() {
  const atlas = yield call(service.getNationalAtlas);

  yield put(actions.setNationalAtlas(atlas));
}
