import _ from 'lodash';
import { fork, all, call, delay } from 'redux-saga/effects';
import { loadNationalAtlasSaga } from './geography/nation/saga';
import removeAppLoader from './removeAppLoader';
import viewportResizeWatcher from './viewport/resizeWatcher';
import nationalMapResizeWatcher from './geography/nation/resize.saga';
import loadCongressSaga from './congress/load.saga';

export default function* rootSaga() {
  yield fork(initiateWatchers);

  yield all([
    call(loadNationalAtlasSaga),
    call(loadCongressSaga),
  ]);

  yield delay(500);

  yield call(removeAppLoader);
}

const watcherSagas = [
  viewportResizeWatcher,
  nationalMapResizeWatcher,
];

export function* initiateWatchers() {
  yield all(_.map(watcherSagas, watcher => call(watcher)));
}
