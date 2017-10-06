import * as types from '../actions/action-types';

const initialState = {
    user: {
        IdUser: 0,
        Name: '#Anon',
        Avatar: 'oldship.png',
        Victory: 0,
        Defeat: 0
    }
};

const userReducer = function(state = initialState, action) {

    switch(action.type) {

        case types.GET_USER_SUCCESS:
            return Object.assign({}, state, { user: action.user });
        default:
            return state;
    }
};

export default userReducer;
