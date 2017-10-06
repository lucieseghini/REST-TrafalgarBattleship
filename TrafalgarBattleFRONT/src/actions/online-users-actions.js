import * as types from '../actions/action-types';

export function getOnlineUsersSuccess(parameters) {
    let onlineUsers = parameters.onlineUsers;

    return {
        type: types.GET_ONLINE_USERS_SUCCESS,
        onlineUsers
    };
}