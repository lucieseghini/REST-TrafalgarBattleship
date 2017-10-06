import React from 'react';
import { connect } from 'react-redux';
import { Grid, Row } from 'react-bootstrap';

import ColContainer from './ColContainer';

class ShotGridContainer extends React.Component {

    renderCols = (cols, row) => {
        let line = [];
        for(let j = row; j < row+10; j++) {
            let caseClass = "water";
            if ( cols[j].IsHit )
                caseClass = "emptyHitCase";
            if ( cols[j].IsOccupied )
                caseClass = "occupied";
            line[j] = <ColContainer Coordinate={cols[j].Coordinate} isHit={cols[j].IsHit} className={caseClass} key={row+j} turn={this.props.turn} />;
        }
        return line;
    };

    renderRow = (row) => {
        let cols=[];
        this.props.shotGrid.Cases.forEach((cases,index) => {
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
                {this.props.shotGrid.Cases.map((cases, index) => {
                    if( index%10 === 0 && index < 100 )
                    {
                        return (
                            this.renderRow(index)
                        )
                    }
                    else
                    {
                        return null;
                    }
                })}
            </Grid>
        )
    }
}

const mapStateToProps = function(store) {
    return {
        shotGrid: store.shotGridState.shotGrid
    };
};

export default connect(mapStateToProps)(ShotGridContainer);
