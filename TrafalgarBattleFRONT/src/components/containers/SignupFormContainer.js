import React from 'react';
import { connect } from 'react-redux';
import { Button, Form, FormGroup, FormControl, ControlLabel, InputGroup, Glyphicon, Alert} from 'react-bootstrap';

import { userSignupRequest } from '../../api/user-api';

class SignupFormContainer extends React.Component {

    state = {
        username: '',
        password: '',
        passwordConfirmation: '',
        alertAttribute: 'notAlerted',
        alertText: '',
    };

    onChangeUsername = (e) =>{
        e.preventDefault();
        this.setState({ username: this.inputUsername.value });
    };

    onChangePasswordConfirmation = (e) =>{
        e.preventDefault();
        this.setState({ passwordConfirmation: this.inputPasswordConfirmation.value });
    };

    onChangePassword = (e) =>{
        e.preventDefault();
        this.setState({ password: this.inputPassword.value });
    };

    onSubmit = (e) => {
        e.preventDefault();
        if( this.state.username !== '' && this.state.password.length >= 8 && this.state.passwordConfirmation === this.state.password )
        {
            userSignupRequest(this.state);

            if(this.props.user !== '#Anon') {
                this.setState({
                    alertAttribute: 'alerted success',
                    alertText: 'Inscription réussie !'
                });
                this.props.closeModalSignup();
            }
        }
        else
        {
            this.setState({
                alertAttribute: 'alerted danger',
                alertText: 'Veuillez remplir les champs du formulaire !'
            });
        }
    };

    render() {
        return (
            <Form onSubmit={this.onSubmit}>
                <FormGroup>
                    <ControlLabel className="col-md-2 control-label">Pseudo</ControlLabel>
                    <InputGroup className="col-md-10 inputGroupContainer">
                        <InputGroup.Addon><Glyphicon glyph="user"/></InputGroup.Addon>
                        <FormControl type="text" inputRef={(ref) => {this.inputUsername = ref;}} onChange={this.onChangeUsername}/>
                    </InputGroup>
                </FormGroup>
                <FormGroup>
                    <ControlLabel className="col-md-2 control-label">Mot de passe</ControlLabel>
                    <InputGroup className="col-md-10 inputGroupContainer">
                        <InputGroup.Addon><Glyphicon glyph="eye-close"/></InputGroup.Addon>
                        <FormControl type="password" inputRef={(ref) => {this.inputPassword = ref;}} onChange={this.onChangePassword}/>
                    </InputGroup>
                </FormGroup>
                <FormGroup>
                    <ControlLabel className="col-md-2 control-label">Confirmation</ControlLabel>
                    <InputGroup className="col-md-10 inputGroupContainer">
                        <InputGroup.Addon><Glyphicon glyph="eye-close"/></InputGroup.Addon>
                        <FormControl type="password" inputRef={(ref) => {this.inputPasswordConfirmation = ref;}} onChange={this.onChangePasswordConfirmation}/>
                    </InputGroup>
                </FormGroup>
                <FormGroup>
                    <Button type="submit" bsStyle="warning">S'inscrire</Button>
                </FormGroup>
                <Alert className={this.state.alertAttribute}>{this.state.alertText}</Alert>
            </Form>
        );
    }
}

const mapStateToProps = function(store) {
    return {
        user: store.userState.user
    };
};

export default connect(mapStateToProps)(SignupFormContainer);
