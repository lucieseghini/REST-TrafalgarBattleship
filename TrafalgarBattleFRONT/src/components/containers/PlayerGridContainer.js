import React from 'react';
import { connect } from 'react-redux';
import { Grid, Row, Col } from 'react-bootstrap';

class PlayerGridContainer extends React.Component {

    renderCols = (cols, row) => {
        let line = [];
        for(let j = row; j < row+10; j++) {
            line[j] = <Col bsClass="col" sm={1} md={1} lg={1} x={j-row} y={row} className={cols[j].IsOccupied ? "occupied" : "water"} key={row+j} />;
        }
        return line;
    };

    renderRow = (row) => {
        let cols=[];
        this.props.player.PlayerGrid.Cases.forEach((cases,index) => {
            if( index >= row && index < row+10 )
            {
                cols[index] = cases;
            }
        });
        return (
            <Row bsClass="row" key={row}>
                {this.renderCols(cols, row)}
            </Row>
        )
    };

    render() {
        return (
            <Grid bsClass="grid">
                {this.props.player.PlayerGrid.Cases.map((cases, index) => {
                    if( index%10 === 0 && index < 100 )
                    {
                        return (
                            this.renderRow(index)
                        )
                    }
                    else
                        return null;
                })}
            </Grid>
        )
    }
}

const mapStateToProps = function(store) {
    return {
        player: store.playerState.player
    };
};

export default connect(mapStateToProps)(PlayerGridContainer);