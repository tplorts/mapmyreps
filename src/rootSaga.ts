import { all, call, delay } from 'redux-saga/effects';
import loadCongressSaga from './congress/load.saga';
import { loadNationalAtlasSaga } from './geography/nation/saga';
import removeAppLoader from './removeAppLoader';

export default function* rootSaga() {
  // Might end up using other watchers later
  // yield fork(initiateWatchers);

  yield all([
    call(loadNationalAtlasSaga),
    call(loadCongressSaga),
  ]);

  yield delay(500);

  yield call(removeAppLoader);
}

// const watcherSagas = [
// ];
// export function* initiateWatchers() {
//   yield all(_.map(watcherSagas, watcher => call(watcher)));
// }
