import * as types from '../actions/action-types';

export function getGameSuccess(parameters) {
    let game = parameters.game;

    return {
        type: types.GET_GAME_SUCCESS,
        game
    };
}
