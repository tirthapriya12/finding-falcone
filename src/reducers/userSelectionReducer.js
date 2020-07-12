import types from '../actions/types';

const initialState = {
    selections: [],
}

export default function (state = initialState, action) {
    const { selections } = state;
    switch (action.type) {
        case types.SET_USER_SELECTION:
            selections.push(action.payload)
            return {
                ...state,
                selections: [...selections],
            }
        case types.MODIFY_USER_SELECTION:
            selections[action.payload.index] = action.payload.selection;
            return {
                ...state,
                selections
            }
        case types.RESET_USER_SELECTION:
            return {
                selections: []
            }
        default:
            return state;
    }
}