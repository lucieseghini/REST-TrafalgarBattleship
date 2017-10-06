import React from 'react';
import { Link } from 'react-router';
import { Nav, Image, Jumbotron } from 'react-bootstrap';

class Header extends React.Component {

    render (){
        if(this.props.show) {
            return (
                <div>
                    <Nav className="navbar navbar-default navbar-static-top" role="banner">
                        <div className="container-fluid">
                            <div className="navbar-header">
                                <Link to="/" className="navbar-brand">
                                    <Image src="oldship.png" id="brand"/>
                                </Link>
                            </div>
                        </div>
                    </Nav>
                    <Jumbotron className="jumbotron text-center">
                        <div id="header">
                            <h1>Trafalgar Battleship</h1>
                        </div>
                    </Jumbotron>
                </div>
            )
        }
        else
            return null;
    }
}

export default Header;