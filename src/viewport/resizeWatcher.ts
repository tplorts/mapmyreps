import _ from 'lodash';
import store from '../store';
import * as actions from './actions';

const onViewportResizeDebounced = _.debounce(onViewportResize, 200);

export default function viewportResizeWatcher() {
  window.addEventListener('resize', onViewportResizeDebounced);
}

function onViewportResize() {
  store.dispatch(actions.viewportDidResize());
}