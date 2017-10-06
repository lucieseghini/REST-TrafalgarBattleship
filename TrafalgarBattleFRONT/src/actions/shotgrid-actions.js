import * as types from '../actions/action-types';

export function getShotGridSuccess(parameters) {
    let shotGrid = parameters.shotGrid;

    return {
        type: types.GET_SHOTGRID_SUCCESS,
        shotGrid
    };
}