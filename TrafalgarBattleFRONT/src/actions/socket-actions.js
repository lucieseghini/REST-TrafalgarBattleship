import * as types from '../actions/action-types';

export function getSocketSuccess(parameters) {
    let socket = parameters.socket;

    return {
        type: types.GET_SOCKET_SUCCESS,
        socket
    };
}
