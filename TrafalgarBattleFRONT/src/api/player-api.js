import store from '../store';
import { getPlayerSuccess } from '../actions/player-actions';

export function setPlayer(player) {
    return store.dispatch(getPlayerSuccess({player: player}));
}