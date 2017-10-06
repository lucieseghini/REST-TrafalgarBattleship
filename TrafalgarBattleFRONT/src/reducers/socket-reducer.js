import * as types from '../actions/action-types';

const initialState = {
    socket: {}
};

const socketReducer = function(state = initialState, action) {

    switch(action.type) {

        case types.GET_SOCKET_SUCCESS:
            return Object.assign({}, state, { socket: action.socket });
        default:
            return state;
    }
};

export default socketReducer;
