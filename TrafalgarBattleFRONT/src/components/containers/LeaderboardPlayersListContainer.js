import React from 'react';
import LeaderboardPlayersList from '../views/LeaderboardPlayersList';
import * as leaderboardAPI from '../../api/leaderboard-api';

import { Table } from 'react-bootstrap';

class LeaderboardPlayersListContainer extends React.Component {

    componentDidMount () {
        leaderboardAPI.getLeaderboard();
    };

    render() {
         return (
            <Table striped condensed hover>
                <thead>
                <tr>
                    <th/>
                    <th>Position</th>
                    <th>Joueur</th>
                    <th>Victoire</th>
                    <th>Défaite</th>
                    <th>Total</th>
                </tr>
                </thead>
                <LeaderboardPlayersList />
            </Table>
        )
    }
}

export default LeaderboardPlayersListContainer;