import * as types from '../actions/action-types';

export function getOpponentSuccess(parameters) {
    let opponent = parameters.opponent;

    return {
        type: types.GET_OPPONENT_SUCCESS,
        opponent
    };
}
