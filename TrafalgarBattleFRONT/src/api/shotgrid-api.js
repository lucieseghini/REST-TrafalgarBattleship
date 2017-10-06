import store from '../store';
import { getShotGridSuccess } from '../actions/shotgrid-actions';

export function setShotGrid(shotGrid) {
    return store.dispatch(getShotGridSuccess({shotGrid: shotGrid}));
}