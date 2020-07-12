import types from './types';

export const setUserSelection = (selection, index) => {
    return {
        type: types.SET_USER_SELECTION,
        payload: selection
    }
}

export const editUserSelection = (selection, index) => {
    return {
        type: types.MODIFY_USER_SELECTION,
        payload: {
            selection,
            index
        }
    }
}