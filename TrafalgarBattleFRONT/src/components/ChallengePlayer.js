import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { hubConnection } from 'signalr-no-jquery';
import { Modal, Button } from "react-bootstrap";

import SearchFormContainer from './containers/SearchFormContainer';
import OnlineUserListContainer from './containers/OnlineUserListContainer';

import { updateOnlineUserList } from "../api/online-users-api";
import { setUser } from '../api/user-api';
import { setSocket } from '../api/socket-api';
import { setGame } from '../api/game-api';
import { setPlayer} from '../api/player-api';
import { setPlayerGrid } from '../api/playergrid-api';
import { setShotGrid } from '../api/shotgrid-api';
import { setOpponent } from '../api/opponent-api';

import '../css/bootstrap/css/bootstrap.min.css';
import '../css/style.css';

class ChallengePlayer extends React.Component {
    state = {
        showModalOnWaitForDefiedResponse: false,
        showModalOnBeingDefied: false,
        opponent: this.props.opponent,
        modalTextOnWaitForDefiedResponse: ''
    };

    openModalOnBeingDefied = (opponent) => {
        this.setState({
            opponent: opponent,
            showModalOnBeingDefied : true
        });
    };

    openModalOnWaitForDefiedResponse = (opponent) => {
        this.setState({
            opponent: opponent,
            showModalOnWaitForDefiedResponse : true
        });
    };

    closeModalModalOnWaitForDefiedResponse = () => {
        this.setState({ showModalOnWaitForDefiedResponse : false });
    };

    closeModalOnBeingDefied = () => {
        this.setState({ showModalOnBeingDefied : false });
    };

    challengeAccepted = () => {
        this.closeModalOnBeingDefied();
        this.props.socket.invoke('ChallengeAccepted', this.state.opponent.ConnectionId);
    };

    challengeDeclined = () => {
        this.closeModalOnBeingDefied();
        this.props.socket.invoke('ChallengeDeclined', this.state.opponent.ConnectionId);
    };

    escapeFromThisTrap = () => {
        this.props.socket.invoke('ChallengeUserAbort', this.state.opponent.ConnectionId);
        this.closeModalModalOnWaitForDefiedResponse();
    };

    componentDidMount() {
        this.connection = hubConnection('http://localhost:54409');
        this.OnlineUserStoreProxy = this.connection.createHubProxy('OnlineUserStore');

        this.OnlineUserStoreProxy.on('updateOnlineUserList', (_connections) => {
            updateOnlineUserList(_connections);
        });

        this.OnlineUserStoreProxy.on('setUser',(_user) => {
            setUser(_user);
        });

        this.OnlineUserStoreProxy.on('defied', (opponent) => {
            this.openModalOnBeingDefied(opponent);
        });

        this.OnlineUserStoreProxy.on('waitingForResponse', (opponent) => {
            this.setState({modalTextOnWaitForDefiedResponse: "En attente de réponse de l'adversaire !"});
            this.openModalOnWaitForDefiedResponse(opponent);
        });

        this.OnlineUserStoreProxy.on('abortChallenge', () => {
            this.closeModalOnBeingDefied();
        });

        this.OnlineUserStoreProxy.on('displayDeniedChallenge', () => {
            this.setState({modalTextOnWaitForDefiedResponse: "Challenge refusé !"});
            setTimeout(() => {
                this.closeModalModalOnWaitForDefiedResponse()
            }, 2000);
        });

        this.OnlineUserStoreProxy.on('renderSearchOnlineUser', (user) => {
            updateOnlineUserList(user);
        });

        this.OnlineUserStoreProxy.on('startGame', (game,player,challenger) => {
            setGame(game);
            setPlayer(player);
            setPlayerGrid(player.PlayerGrid);
            setShotGrid(player.ShotGrid);
            setOpponent(challenger);
            browserHistory.push('/game/placing-ships');
        });

        this.connection.start().done( () => {
            setSocket(this.OnlineUserStoreProxy);
            if(this.props.user.Name === '#Anon')
            {
                this.OnlineUserStoreProxy.invoke('CreateUserFromName',this.props.user.Name);
            }
            else
            {
                this.OnlineUserStoreProxy.invoke('Connect', this.props.user.IdUser, this.props.user.Name, this.props.user.Avatar, this.props.user.Victory, this.props.user.Defeat);
            }
		});
    }

    componentWillUnmount() {
        this.OnlineUserStoreProxy.invoke('Disconnect');
    }

    render() {
        return (
            <div className="content">
                <div id="board">
                    <h1>C'est parti {(this.props.user.Name !== '#Anon') ? this.props.user.Name : null}, défie un adversaire !</h1>

                    <SearchFormContainer typeSearch="PLAYER"/>

                    <br/>
                    <div className="bs-example">
                        <OnlineUserListContainer />
                    </div>

                    <Modal show={this.state.showModalOnBeingDefied} onHide={this.challengeDeclined}>
                        <Modal.Header closeButton>
                            <Modal.Title>Défi</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            Une flotte de navire dirigée par l'amiral {this.state.opponent.Name} vous met au défi de la couler !
                        </Modal.Body>
                        <Modal.Footer>
                            <Button bsStyle="danger" onClick={this.challengeAccepted}>A l'attaque !</Button>
                            <Button bsStyle="warning" onClick={this.challengeDeclined}>S'enfuir !</Button>
                        </Modal.Footer>
                    </Modal>

                    <Modal show={this.state.showModalOnWaitForDefiedResponse} onHide={this.escapeFromThisTrap}>
                        <Modal.Header closeButton>
                            <Modal.Title>Défi</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {this.state.modalTextOnWaitForDefiedResponse}
                        </Modal.Body>
                        <Modal.Footer>
                            <Button bsStyle="danger" onClick={this.escapeFromThisTrap}>Abandonner</Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            </div>
        )
    }
}

const mapStateToProps = function(store) {
    return {
        user: store.userState.user,
        opponent: store.opponentState.opponent,
        socket: store.socketState.socket
    };
};

export default connect (mapStateToProps)(ChallengePlayer);

