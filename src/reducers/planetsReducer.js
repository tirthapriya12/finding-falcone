
import types from '../actions/types';
const initialState = {
    loading:    false,
    planetList: []
}

export default function (state = initialState, action) {
    switch (action.type) {
        case types.GET_PLANETS:
            return {
                ...state,
                planetList: action.payload,
                loading: false
            }
        case types.PLANETS_LOADING:
            return {
                ...state,
                loading: true
            }

        default:
            return state
    }
}