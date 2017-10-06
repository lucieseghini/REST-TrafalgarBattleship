import store from '../store';
import { getGameSuccess } from '../actions/game-actions';

export function setGame(game) {
    return store.dispatch(getGameSuccess({game: game}));
}