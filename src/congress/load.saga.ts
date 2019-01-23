import _ from 'lodash';
import { all, put } from 'redux-saga/effects';
import { fetchJSON } from '../utilities/fetchJSON';
import * as actions from './actions';
import assembleLegislators from './assembleLegislators';
import { resourceUrls } from './resources';

export default function* loadCongressSaga() {
  const congressData = yield all(_.mapValues(resourceUrls, fetchJSON));

  // const transformationStart = Date.now();

  const legislatorsGroupedByState = assembleLegislators(congressData);

  // const transformationEnd = Date.now();
  // const duration = transformationEnd - transformationStart;
  // console.log(`transformation duration: ${duration}`);

  yield put(actions.setLegislators(legislatorsGroupedByState));
}
