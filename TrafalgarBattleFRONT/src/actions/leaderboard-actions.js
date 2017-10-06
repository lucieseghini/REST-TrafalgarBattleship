import * as types from '../actions/action-types';

export function getLeaderboardSuccess(parameters) {
    let leaderboard = parameters.leaderboard;

    return {
        type: types.GET_LEADERBOARD_SUCCESS,
        leaderboard
    };
}

