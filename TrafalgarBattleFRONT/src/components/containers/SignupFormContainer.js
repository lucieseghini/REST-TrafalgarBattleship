import React from 'react';
import { connect } from 'react-redux';
import { Button, Form, FormGroup, FormControl, ControlLabel, InputGroup, Glyphicon, Alert} from 'react-bootstrap';

import { userSignupRequest } from '../../api/user-api';

class SignupFormContainer extends React.Component {

    state = {
        username: '',
        alertAttribute: 'notAlerted',
        alertText: '',
    };

    onChangeUsername = (e) =>{
        e.preventDefault();
        this.setState({ username: this.inputUsername.value });
    };

    onSubmit = (e) => {
        e.preventDefault();
        if( this.state.username !== '' )
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
            <Form action={this.props.action} method={this.props.method} onSubmit={this.onSubmit}>
                <FormGroup>
                    <ControlLabel className="col-md-2 control-label">Pseudo</ControlLabel>
                    <InputGroup className="col-md-10 inputGroupContainer">
                        <InputGroup.Addon><Glyphicon glyph="user"/></InputGroup.Addon>
                        <FormControl type="text" inputRef={(ref) => {this.inputUsername = ref;}} onChange={this.onChangeUsername}/>
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
