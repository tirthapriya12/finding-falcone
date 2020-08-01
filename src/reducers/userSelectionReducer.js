import types from '../actions/types';
import UserSelection from '../models/userSelection';

const MAX_SELECTABLE_PLANETS = 4;
const initialState = {
    selections: Array(MAX_SELECTABLE_PLANETS).fill().map(()=>(new UserSelection())),
    vehicleAvailabilityMap: null
}

export default function (state = initialState, action) {
    let { selections, vehicleAvailabilityMap } = state;
    switch (action.type) {
        case types.SET_USER_SELECTION:
            let newSelections = selections.slice();
            newSelections[action.payload.index] = {...action.payload.selection};
            return {
                ...state,
                selections: [...newSelections],
            }
        case types.MODIFY_USER_SELECTION:
            selections[action.payload.index] = action.payload.selection;
            return {
                ...state,
                selections
            }
        case types.UPDATE_VEHICLE_AVAILABILITY:
            vehicleAvailabilityMap = action.payload.vehicleAvailabilityMap;
            return {
                ...state,
                vehicleAvailabilityMap
            };
        case types.RESET_USER_SELECTION:
            return {
                selections: []
            }
        default:
            return state;
    }
}