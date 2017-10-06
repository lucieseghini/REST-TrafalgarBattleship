import React from 'react';
import { connect } from 'react-redux';
import { Col } from 'react-bootstrap';

class ColContainer extends React.Component {

    fireShot = () => {
        this.props.socket.invoke('FireShot', this.props.game, this.props.player.ConnectionId, this.props.Coordinate.Row, this.props.Coordinate.Column);
    };

    render() {
        return (
            <Col bsClass="col" sm={1} md={1} lg={1} className={this.props.className}  onClick={(this.props.turn && !this.props.isHit) ? this.fireShot : null} />
        )
    }
}

const mapStateToProps = function(store) {
    return {
        socket: store.socketState.socket,
        player: store.playerState.player,
        game: store.gameState.game
    };
};

export default connect(mapStateToProps)(ColContainer);