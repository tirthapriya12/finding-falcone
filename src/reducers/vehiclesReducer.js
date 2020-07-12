import types from '../actions/types';

const initialState = {
    vehicleList: [],
    loading:     false
}

export default function (state = initialState, action) {

    switch (action.type) {
        case types.GET_VEHICLES:
            return {
                ...state,
                vehicleList: action.payload,
                loading: false
            }
        case types.VEHICLES_LOADING:
            return {
                ...state,
                loading: true
            }
        default:
            return state;
    }
}