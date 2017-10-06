import React from 'react';
import { connect } from 'react-redux';

import LeaderboardPlayersListContainer from './containers/LeaderboardPlayersListContainer';
import SearchFormContainer from './containers/SearchFormContainer';

import '../css/bootstrap/css/bootstrap.min.css';
import '../css/style.css';

class Leaderboard extends React.Component {

    render() {
        return (
			<div className="content">
				<div id="board">
					<h1>Leaderboard : Classement des meilleurs joueurs !</h1>

					<SearchFormContainer typeSearch="LEADERBOARD"/>
					<br/>
					<LeaderboardPlayersListContainer/>
				</div>
			</div>
        )
    }
}

const mapStateToProps = function(store) {
    return {
        user: store.userState.user
    };
};

export default connect(mapStateToProps)(Leaderboard);
