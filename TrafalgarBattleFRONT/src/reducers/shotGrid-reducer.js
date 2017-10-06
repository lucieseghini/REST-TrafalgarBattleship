import * as types from '../actions/action-types';

const initialState = {
    shotGrid: {}
};

const shotGridReducer = function(state = initialState, action) {

    switch(action.type) {

        case types.GET_SHOTGRID_SUCCESS:
            return Object.assign({}, state, { shotGrid: action.shotGrid });
        default:
            return state;
    }
};

export default shotGridReducer;
