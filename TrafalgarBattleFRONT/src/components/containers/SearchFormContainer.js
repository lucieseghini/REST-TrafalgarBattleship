import React from 'react';
import SearchForm from '../views/SearchForm';
import { connect } from 'react-redux';
import * as leaderboardApi from '../../api/leaderboard-api';


class SearchFormContainer extends React.Component {
    render() {

        let search = (event) => {
            event.preventDefault();

            let query = this.refs.child.getQuery();

            if ( this.props.typeSearch === "PLAYER" )
            {
                this.props.socket.invoke('SearchOnlineUser', query);
            }
            else if (this.props.typeSearch === "LEADERBOARD" )
            {
                leaderboardApi.searchLeaderboard(query);
            }
        };

        return (
            <SearchForm search={search} ref="child" />
        )
    }
}

const mapStateToProps = function(store) {
    return {
        socket: store.socketState.socket
    };
};

export default connect (mapStateToProps)(SearchFormContainer);