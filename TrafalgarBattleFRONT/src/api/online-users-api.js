import store from '../store';
import { getOnlineUsersSuccess } from '../actions/online-users-actions';

export function updateOnlineUserList(onlineUsers) {
    store.dispatch(getOnlineUsersSuccess({onlineUsers: onlineUsers}));
    return onlineUsers;
}