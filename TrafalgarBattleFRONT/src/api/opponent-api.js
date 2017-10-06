import store from '../store';
import { getOpponentSuccess } from '../actions/opponent-actions';

export function setOpponent(opponent) {
    return store.dispatch(getOpponentSuccess({opponent: opponent}));
}