import React from 'react';
import { connect } from 'react-redux';

import { Button, Glyphicon } from 'react-bootstrap';
import { Link } from 'react-router';

import '../css/bootstrap/css/bootstrap.min.css';
import '../css/style.css';
import '../css/placing.css';
import PlayerGridContainer from "./containers/PlayerGridContainer";

class PlacingShips extends React.Component {

    render() {
        return (
            <div className="content">
                <div id="placing">
                    <h1>Place tes navires {this.props.user.Name !== '#Anon' ? this.props.user.Name : null}</h1>
                </div>
                <div className="container">
                    <div className="row">
                        <section className="col col-3 col-sm-3 col-md-3 col-lg-3">
                            <p>Croiseur
                                <Glyphicon glyph="certificate"/>
                                <Glyphicon glyph="certificate"/>
                            </p>
                            <p>Torpilleur
                                <Glyphicon glyph="certificate"/>
                                <Glyphicon glyph="certificate"/>
                            </p>
                            <p>Sous-marin
                                <Glyphicon glyph="certificate"/>
                            </p>
                            <p>Contre-torpilleurs
                                <Glyphicon glyph="certificate"/>
                            </p>
                            <p>Porte-avions
                                <Glyphicon glyph="certificate"/>
                            </p>
                        </section>

                        <section className="col col-7 col-sm-7 col-md-7 col-lg-7">
                            <PlayerGridContainer/>
                        </section>
                        <section className="col col-2 col-sm-2 col-md-2 col-lg-2">
                            <Link to="/game/battle"><Button bsStyle="primary">Commencer la bataille</Button></Link>
                        </section>
                    </div>
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

export default connect(mapStateToProps)(PlacingShips);

