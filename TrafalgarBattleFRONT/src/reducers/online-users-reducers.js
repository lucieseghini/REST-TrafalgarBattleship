import * as types from '../actions/action-types';

const initialState = {
    onlineUsers: []
};

const onlineUsersReducer = function(state = initialState, action) {

    switch(action.type) {

        case types.GET_ONLINE_USERS_SUCCESS:
            return Object.assign({}, state, { onlineUsers: action.onlineUsers });
        default:
            return state;
    }
};

export default onlineUsersReducer;
