import * as types from '../actions/action-types';

export function getPlayerSuccess(parameters) {
    let player = parameters.player;

    return {
        type: types.GET_PLAYER_SUCCESS,
        player
    };
}
