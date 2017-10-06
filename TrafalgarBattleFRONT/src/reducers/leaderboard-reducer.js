import * as types from '../actions/action-types';

const initialState = {
    leaderboard: []
};

const leaderboardReducer = function(state = initialState, action) {

    switch(action.type) {

        case types.GET_LEADERBOARD_SUCCESS:
            return Object.assign({}, state, { leaderboard: action.leaderboard });
        default:
            return state;
    }
};

export default leaderboardReducer;