import { combineReducers } from 'redux';
import leaderboardReducer from './leaderboard-reducer';
import playerGridReducer from './player-grid-reducer';
import onlineUsersReducer from './online-users-reducers';
import userReducer from './user-reducer';
import opponentReducer from './opponent-reducer';
import socketReducer from './socket-reducer';
import gameReducer from './game-reducer';
import playerReducer from './player-reducer';
import shotGridReducer from './shotGrid-reducer';

let reducers = combineReducers({
    leaderboardState: leaderboardReducer,
    playerGridState: playerGridReducer,
    onlineUsersState: onlineUsersReducer,
    userState: userReducer,
    opponentState: opponentReducer,
    socketState: socketReducer,
    gameState: gameReducer,
    playerState: playerReducer,
    shotGridState: shotGridReducer
});

export default reducers;