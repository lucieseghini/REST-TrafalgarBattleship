import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import PlayerGridContainer from './containers/PlayerGridContainer';
import ShotGridContainer from './containers/ShotGridContainer';

import { setShotGrid } from '../api/shotgrid-api';

import { Label, Modal, Button, ProgressBar } from 'react-bootstrap';
import '../css/game.css';

class Game extends React.Component {

    state = {
        turn: false,
        message: '',
        messageType: '',
        modalMessage: '',
        showModal: false,
        playerSuccessfullHit: 0,
        opponentSuccessfullHit: 0,
        shotGridClassName: 'col col-6 col-sm-6 col-md-6 col-lg-6 gameSection',
        opponentDisconnected: false,
        errorGame: false
    };

    updateShotGrid = (ShotGrid) => {
        setShotGrid(ShotGrid);
    };

    componentDidMount() {
        this.props.socket.on('firstToPlay', (isFirstToPlay) => {
            isFirstToPlay ? this.setState({turn: true, message: 'Tire en premier', messageType: 'default'})
                : this.setState({turn: false, message: 'Tu vas te faire attaquer en premier', messageType: 'default', shotGridClassName: 'col col-6 col-sm-6 col-md-6 col-lg-6 opacgameSection'});
        });

        this.props.socket.on('updateShotGridOnMissedShot', (ShotGrid) => {
            this.updateShotGrid(ShotGrid);
            this.setState({
                message: 'Raté !',
                messageType: 'danger',
                turn: false,
                shotGridClassName: 'col col-6 col-sm-6 col-md-6 col-lg-6 opacgameSection'
            });
            setTimeout( () => {
                this.setState({
                    message: "Tour de l'adversaire",
                    messageType: 'default'
                })
            }, 2000);
        });

        this.props.socket.on('updateShotGridOnSuccessfullShot', (ShotGrid) => {
            this.updateShotGrid(ShotGrid);
            this.setState({
                message: 'Touché',
                messageType: 'success',
                playerSuccessfullHit: this.state.playerSuccessfullHit+1
            });
            setTimeout( () => {
                this.setState({
                    message: 'Vous pouvez rejouer !',
                    messageType: 'default'
                })
            }, 2000);
        });

        this.props.socket.on('updateShotGridOnSunkShip', (ShotGrid) => {
            this.updateShotGrid(ShotGrid);
            this.setState({
                message: 'Coulé',
                messageType: 'success',
                playerSuccessfullHit: this.state.playerSuccessfullHit+1
            });
            setTimeout( () => {
                this.setState({
                    message: 'Vous pouvez rejouer !',
                    messageType: 'default'
                })
            }, 2000);
        });

        this.props.socket.on('notifyPlayerVictory', (ShotGrid) => {
            this.updateShotGrid(ShotGrid);
            this.setState({
                modalMessage: 'Vous avez Gagné !',
                turn: false,
                playerSuccessfullHit: this.state.playerSuccessfullHit+1,
                shotGridClassName: 'col col-6 col-sm-6 col-md-6 col-lg-6 opacgameSection'
            });
            this.openModal();
        });

        this.props.socket.on('notifyPlayerDefeat', () => {
            this.openModal();
            this.setState({
                modalMessage: 'Vous avez perdu !',
                opponentSuccessfullHit: this.state.opponentSuccessfullHit + 1
            });
        });

        this.props.socket.on('setTurn', () => {
            this.setState({
                message: 'A votre tour',
                messageType: 'default',
                turn: true,
                shotGridClassName: 'col col-6 col-sm-6 col-md-6 col-lg-6 gameSection'
            });
        });

        this.props.socket.on('notifyHit', () => {
            this.setState({
                message: 'Votre navire est touché',
                messageType: 'warning',
                opponentSuccessfullHit: this.state.opponentSuccessfullHit+1
            });
            setTimeout( () => {
                this.setState({
                    message: 'Votre adversaire rejoue !',
                    messageType: 'default'
                })
            }, 2000);
        });

        this.props.socket.on('notifyShipHasBeenSink', () => {
            this.setState({
                message: 'Votre navire a coulé',
                messageType: 'danger',
                opponentSuccessfullHit: this.state.opponentSuccessfullHit+1
            });
            setTimeout( () => {
                this.setState({
                    message: 'Votre adversaire rejoue !',
                    messageType: 'default'
                })
            }, 2000);
        });

        this.props.socket.on('notifyOpponentDisconnected', () => {
            this.setState({opponentDisconnected: true});
        });

        this.props.socket.on('errorGame', () => {
            this.setState({errorGame: true});
        });

        this.props.socket.invoke('IsFirstToPlay', this.props.game, this.props.player.ConnectionId);
    }

    openModal = () => {
        this.setState({ showModal : true });
    };

    closeModal = () => {
        this.setState({ showModal : false });
    };

    redirectToChallengePlayerList = () => {
        this.closeModal();
        browserHistory.push('/challenge-player');
    };

    render() {
        return (
            <div className="content">
                <div id="placing">
                    <h1>A l'attaque !</h1>
                    <Label bsStyle={this.state.messageType}>{this.state.message}</Label>
                </div>

                <div className="container">
                    <div className="row">
                        <div className="col col-6 col-sm-6 col-md-6 col-lg-6 gameSection">
                            <h1>{this.props.player.Name}</h1>
                            <ProgressBar active now={100-this.state.opponentSuccessfullHit*(100/17)} />
                            <PlayerGridContainer />
                        </div>
                        <div className={this.state.shotGridClassName}>
                            <h1>{this.props.opponent.Name}</h1>
                            <ProgressBar active now={100-this.state.playerSuccessfullHit*(100/17)} />
                            <ShotGridContainer turn={this.state.turn} />
                        </div>
                    </div>
                </div>

                <Modal show={this.state.showModal} onHide={this.redirectToChallengePlayerList}>
                    <Modal.Header closeButton>
                        <Modal.Title>{this.state.modalMessage}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Button onClick={this.redirectToChallengePlayerList} >Faire une autre partie</Button>
                    </Modal.Body>
                </Modal>

                <Modal show={this.state.opponentDisconnected} onHide={this.redirectToChallengePlayerList} >
                    <Modal.Header closeButton>
                        <Modal.Title>Adversaire deconnecté !</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Nous sommes désolé mais il semblerait que votre adversaire soit parti !
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.redirectToChallengePlayerList} >Retourner à la liste des joueurs</Button>
                    </Modal.Footer>
                </Modal>

                <Modal show={this.state.errorGame} onHide={this.redirectToChallengePlayerList} >
                    <Modal.Header closeButton>
                        <Modal.Title>Erreur !</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Désolé, une erreur est survenue !
                        Veuillez retourner sur la liste des joueurs en ligne pour défier un autre joueur.
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.redirectToChallengePlayerList} >Retourner à la liste des joueurs</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

const mapStateToProps = function(store) {
    return {
        opponent: store.opponentState.opponent,
        game: store.gameState.game,
        player: store.playerState.player,
        socket: store.socketState.socket
    };
};

export default connect(mapStateToProps)(Game);

