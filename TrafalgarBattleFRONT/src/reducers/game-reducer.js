import * as types from '../actions/action-types';

const initialState = {
    game: {}
};

const gameReducer = function(state = initialState, action) {

    switch(action.type) {

        case types.GET_GAME_SUCCESS:
            return Object.assign({}, state, { game: action.game });
        default:
            return state;
    }
};

export default gameReducer;
