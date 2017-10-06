import * as types from '../actions/action-types';

export function getUserSuccess(parameters) {
    let user = parameters.user;

    return {
        type: types.GET_USER_SUCCESS,
        user
    };
}
