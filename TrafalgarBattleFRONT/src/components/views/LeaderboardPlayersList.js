import React from 'react';
import { connect } from 'react-redux';
import { Image } from 'react-bootstrap';

class LeaderboardPlayersList extends React.Component {

    renderLeaderboardList () {
        if (Array.isArray(this.props.leaderboard)) {
            return this.props.leaderboard.map((user, index) => {
                return (
                    <tr key={index}>
                        <td><Image src="oldship.png"/></td>
                        <td>{user.Rank}</td>
                        <td>{user.Name}</td>
                        <td>{user.Victory}</td>
                        <td>{user.Defeat}</td>
                        <td>{user.Victory - user.Defeat}</td>
                    </tr>
                );
            })
        }
        else if (!Array.isArray(this.props.leaderboard) && typeof this.props.leaderboard === 'object' && this.props.leaderboard !== null){
            return (
                <tr>
                    <td><Image src={this.props.leaderboard.Avatar} /></td>
                    <td>{this.props.leaderboard.Rank}</td>
                    <td>{this.props.leaderboard.Name}</td>
                    <td>{this.props.leaderboard.Victory}</td>
                    <td>{this.props.leaderboard.Defeat}</td>
                    <td>{this.props.leaderboard.Victory - this.props.leaderboard.Defeat}</td>
                </tr>
            )
        }
        else
        {
            return null;
        }
    }

    render () {
        return (
            <tbody>
                {this.renderLeaderboardList()}
            </tbody>
        )
    }
}

const mapStateToProps = function(store) {
    return {
        leaderboard: store.leaderboardState.leaderboard
    };
};

export default connect(mapStateToProps)(LeaderboardPlayersList);

