import * as types from '../actions/action-types';

const initialState = {
    playerGrid: {}
};

const playerGridReducer = function(state = initialState, action) {

    switch(action.type) {

        case types.GET_PLAYERGRID_SUCCESS:
            return Object.assign({}, state, { playerGrid: action.playerGrid });
        default:
            return state;
    }
};

export default playerGridReducer;
