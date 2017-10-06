import React from 'react';
import { connect } from 'react-redux';

import { Button } from 'react-bootstrap';

class ButtonWithUser extends React.Component {

    sendNotificationToUser = () => {
        this.props.socket.invoke('ChallengeUser',this.props.onlineUser.ConnectionId,this.props.onlineUser.Name,this.props.user.ConnectionId,this.props.user.Name)
    };

    render() {
        return (
            <Button bsStyle="primary" onClick={this.sendNotificationToUser}>
                Défier
            </Button>
        )
    }
}

const mapStateToProps = function(store) {
    return {
        socket: store.socketState.socket,
        user: store.userState.user
    };
};


export default connect(mapStateToProps)(ButtonWithUser);