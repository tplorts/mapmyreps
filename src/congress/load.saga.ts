import _ from 'lodash';
import { all, put } from 'redux-saga/effects';
import { fetchJSON } from '../utilities/fetchJSON';
import * as actions from './actions';
import assembleLegislators from './assembleLegislators';
import { CONGRESS_DATA_URL } from './constants';

export default function* loadCongressSaga() {
  const resourceNameIndex = {
    legislators: 'legislators-current',
    committees: 'committees-current',
    committeeMembership: 'committee-membership-current',
    socialMedia: 'legislators-social-media',
  };

  const resourceUrls = _.mapValues(
    resourceNameIndex,
    name => `${CONGRESS_DATA_URL}/${name}.json`
  );

  const congressData = yield all(_.mapValues(resourceUrls, fetchJSON));

  // const transformationStart = Date.now();

  const legislatorsGroupedByState = assembleLegislators(congressData);

  // const transformationEnd = Date.now();
  // const duration = transformationEnd - transformationStart;
  // console.log(`transformation duration: ${duration}`);

  yield put(actions.setLegislators(legislatorsGroupedByState));
}
