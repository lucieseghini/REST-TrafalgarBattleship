import axios from 'axios';
import store from '../store';
import { getLeaderboardSuccess } from '../actions/leaderboard-actions';

export function getLeaderboard() {
    return axios.get('http://localhost:54409/api/Leaderboard')
        .then(response => {
            if (response.status === 200 ) {
                store.dispatch(getLeaderboardSuccess({leaderboard: response.data}));
                return response;
            }
        }).catch(error => {
            console.log(error);
        });
}

export function searchLeaderboard(query) {
    return axios.get('http://localhost:54409/api/Leaderboard/'+query)
        .then(response => {
            if (response.status === 200 ) {
                store.dispatch(getLeaderboardSuccess({leaderboard: response.data}));
                return response;
            }
        }).catch(error => {
            console.log(error);
        });
}