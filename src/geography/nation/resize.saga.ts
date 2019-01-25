import _ from 'lodash';
import { Action } from 'redux';
import { takeLatest, all, call, select, put } from 'redux-saga/effects';
import { VIEWPORT_DID_RESIZE } from '../../viewport/actions';
import { NationalAtlas } from '../types';
import { MAP_ELEMENT_ID } from './constants';
import * as selectors from './selectors';
import * as actions from './actions';

export default function* nationalMapResizeWatcher() {
  yield takeLatest(
    [VIEWPORT_DID_RESIZE, actions.SET_NATIONAL_ATLAS],
    resizeNationalMap
  );
}

export function* resizeNationalMap(action: Action) {
  const { elementWidth, sourceWidth } = yield all({
    elementWidth: call(getMapElementWidth),
    sourceWidth: call(getAltasSourceWidth, action),
  });

  if (elementWidth > 0 && sourceWidth > 0) {
    const scaleFactor = _.clamp(elementWidth / sourceWidth, 0.2, 1.4);

    yield put(actions.setMapScaleFactor(scaleFactor));
  }
}

export function getMapElementWidth() {
  const mapElement = document.getElementById(MAP_ELEMENT_ID);

  return mapElement ? mapElement.getBoundingClientRect().width : 0;
}

export function* getAltasSourceWidth(action: Action) {
  if (action.type === actions.SET_NATIONAL_ATLAS) {
    return (action as ReturnType<typeof actions.setNationalAtlas>).payload.size.width;
  }

  const atlas: NationalAtlas = yield select(selectors.getAtlas);

  return atlas.size.width;
}
