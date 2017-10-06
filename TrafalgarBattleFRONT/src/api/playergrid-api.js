import store from '../store';
import { getPlayerGridSuccess } from '../actions/playergrid-actions';

export function setPlayerGrid(playerGrid) {
    return store.dispatch(getPlayerGridSuccess({playerGrid: playerGrid}));
}

