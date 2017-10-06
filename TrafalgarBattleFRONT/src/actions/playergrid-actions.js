import * as types from '../actions/action-types';

export function getPlayerGridSuccess(parameters) {
    let playerGrid = parameters.playerGrid;

    return {
        type: types.GET_PLAYERGRID_SUCCESS,
        playerGrid
    };
}


