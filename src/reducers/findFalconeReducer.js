import types from '../actions/types';

const initialState = {
    token: null,
    status: false,
    planet_name: ''
}

export default function (state = initialState, action) {

    switch (action.type) {
        case types.GET_TOKEN:
            return {
                ...state,
                token: action.payload.token
            }
        case types.FIND_FALCONE:
            return {
                ...state,
                ...action.payload
            }
        default: return state
    }
}