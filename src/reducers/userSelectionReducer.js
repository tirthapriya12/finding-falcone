import types from '../actions/types';
import UserSelection from '../models/userSelection';

const MAX_SELECTABLE_PLANETS = 4;
const initialState = {
    selections: Array(MAX_SELECTABLE_PLANETS).fill().map(()=>(new UserSelection())),
    vehicleAvailabilityMap: null
}

export default function (state = initialState, action) {
    let { selections, vehicleAvailabilityMap } = state;
    let newSelections = selections.slice();
    switch (action.type) {
        case types.SET_USER_SELECTION:
            newSelections[action.payload.index] = new UserSelection(action.payload.selection.planet,action.payload.selection.vehicle);
            return {
                ...state,
                selections: [...newSelections],
            }
        case types.UPDATE_VEHICLE_AVAILABILITY:
            vehicleAvailabilityMap = action.payload.vehicleAvailabilityMap;
            return {
                ...state,
                vehicleAvailabilityMap
            };
        case types.RESET_USER_SELECTION:
            return {
                selections: [Array(MAX_SELECTABLE_PLANETS).fill().map(()=>(new UserSelection()))]
            }
        default:
            return state;
    }
}