import store from '../store';
import { getSocketSuccess } from '../actions/socket-actions';

export function setSocket(socket) {
    return store.dispatch(getSocketSuccess({socket: socket}));
}