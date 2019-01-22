import { action } from 'typesafe-actions';

export const VIEWPORT_DID_RESIZE = `VIEWPORT/DID_RESIZE`;

export const viewportDidResize = () => action(VIEWPORT_DID_RESIZE);
