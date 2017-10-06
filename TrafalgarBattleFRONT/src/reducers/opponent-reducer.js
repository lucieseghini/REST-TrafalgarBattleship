import * as types from '../actions/action-types';

const initialState = {
    opponent: {
        Name: 'Challenger'
    }
};

const opponentReducer = function(state = initialState, action) {

    switch(action.type) {

        case types.GET_OPPONENT_SUCCESS:
            return Object.assign({}, state, { opponent: action.opponent });
        default:
            return state;
    }
};

export default opponentReducer;
