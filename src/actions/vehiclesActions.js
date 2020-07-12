
import types from './types';

const vehiclesURL = "https://findfalcone.herokuapp.com/vehicles";

export const getVehicles = () => (dispatch) => {
    dispatch(setVehiclesLoading());

    fetch(vehiclesURL).then((res) => res.json()).then((vehicles) => {
        dispatch(setVehicles(vehicles));
    })
}


const setVehiclesLoading = () => {
    return {
        type: types.VEHICLES_LOADING
    }
}

const setVehicles = (vehicles) => {
    return {
        type:    types.GET_VEHICLES,
        payload: vehicles
    }
}