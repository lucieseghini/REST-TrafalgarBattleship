import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { Jumbotron, Button, ButtonGroup, Modal } from 'react-bootstrap';

import SignupFormContainer from "./containers/SignupFormContainer";
import LoginFormContainer from "./containers/LoginFormContainer";

import Rules from './views/Rules';

import { resetUserToDefault } from '../api/user-api';

import '../css/bootstrap/css/bootstrap.min.css';
import '../css/style.css';

class Index extends React.Component {

    state = {
        showModalSignUp: false,
        showModalSignIn: false
    };

    openModalSignUp = () => {
        this.setState({ showModalSignUp : true });
    };

    closeModalSignUp = () => {
        this.setState({ showModalSignUp : false });
    };

    openModalSignIn = () => {
        this.setState({ showModalSignIn : true });
    };

    closeModalSignIn = () => {
        this.setState({ showModalSignIn : false });
    };


    redirectToChallengePlayerList = (event) => {
        event.preventDefault();
        browserHistory.push('/challenge-player');
    };
    redirectToLeaderboard = (event) => {
        event.preventDefault();
        browserHistory.push('/leaderboard');
    };

    disconnectUser = (event) => {
        event.preventDefault();
        resetUserToDefault();
    };

    renderName = () => {
        if(this.props.user.Name !== '#Anon')
        {
            return (
                this.props.user.Name
            )
        }
    };

    renderSignUpButton = () => {
        if(this.props.user.Name === '#Anon')
        {
            return (
                <Button bsStyle="primary" bsSize="large" onClick={this.openModalSignUp} block>S'inscrire</Button>
            )
        }
        else
        {
            return null;
        }
    };

    renderSignInButton = () => {
        if(this.props.user.Name === '#Anon')
        {
            return (
                <Button bsStyle="primary" bsSize="large" onClick={this.openModalSignIn} block>Se connecter</Button>
            )
        }
        else
        {
            return null;
        }
    };

    renderDisconnectButton = () => {
        if(this.props.user.Name !== '#Anon')
        {
            return (
                <Button bsStyle="primary" bsSize="large" onClick={this.disconnectUser} block>Deconnexion</Button>
            )
        }
        else
        {
            return null;
        }
    };

    render () {

        return (
            <div>
                <Jumbotron className="jumbotron text-center">
                    <div id="header">
                        <h1>Trafalgar Battleship</h1>
                        <h2>Bienvenue {this.renderName()}</h2>
                    </div>
                    <ButtonGroup vertical>
                        <Button bsStyle="primary" bsSize="large" block onClick={this.redirectToChallengePlayerList}>Commencer une partie</Button>
                        <br/>
                        <Button bsStyle="primary" bsSize="large" block onClick={this.redirectToLeaderboard}>Leaderboard</Button>
                        <br/>
                        {this.renderSignInButton()}
                        {this.renderDisconnectButton()}
                        <br/>
                        {this.renderSignUpButton()}
                        <br/>
                    </ButtonGroup>
                    <br/>
                    <a className="glyphicon glyphicon-menu-down" href="#regles" />
                </Jumbotron>

                <div className="content">

                    <div className="divider" />

                    <Rules />
                    <Modal show={this.state.showModalSignUp} onHide={this.closeModalSignUp}>
                        <Modal.Header closeButton>
                            <Modal.Title>Inscription</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <SignupFormContainer closeModalSignup={this.closeModalSignUp} />
                        </Modal.Body>
                    </Modal>

                    <Modal show={this.state.showModalSignIn} onHide={this.closeModalSignIn}>
                        <Modal.Header closeButton>
                            <Modal.Title>Connexion</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <LoginFormContainer closeModalSignin={this.closeModalSignIn} />
                        </Modal.Body>
                    </Modal>
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

export default connect(mapStateToProps)(Index);