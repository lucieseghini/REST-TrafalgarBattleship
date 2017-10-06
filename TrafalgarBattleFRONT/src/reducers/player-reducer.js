import * as types from '../actions/action-types';

const initialState = {
    player: {}
};

const playerReducer = function(state = initialState, action) {

    switch(action.type) {

        case types.GET_PLAYER_SUCCESS:
            return Object.assign({}, state, { player: action.player });
        default:
            return state;
    }
};

export default playerReducer;
