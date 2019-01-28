import { call, put } from 'redux-saga/effects';
import * as actions from './actions';
import fetchNationalAtlas from './fetchAtlas';

export function* loadNationalAtlasSaga() {
  const atlas = yield call(fetchNationalAtlas);

  yield put(actions.setNationalAtlas(atlas));
}
