import React from 'react';
import { Router, Route, browserHistory } from 'react-router';

import MainLayout from './components/layouts/main-layout';

import Index from './components/Index';
import Leaderboard from './components/Leaderboard';
import ChallengePlayer from './components/ChallengePlayer';
import Game from './components/Game';
import PlacingShips from './components/PlacingShips';


export default (
    <Router history={browserHistory}>
        <Route component={MainLayout}>
            <Route path="/" component={Index} />
            <Route path="/leaderboard" component={Leaderboard} />
            <Route path="/challenge-player" component={ChallengePlayer} />
            <Route path="/game/placing-ships" component={PlacingShips} />
            <Route path="/game/battle" component={Game} />
        </Route>
    </Router>
);
