
import types from './types';

const planetsURL = 'https://findfalcone.herokuapp.com/planets';

export const getPlanets = () => (dispatch) => {
    dispatch(setPlanetsLoading());

    fetch(planetsURL).then((res) => res.json()).then((planets) => {
        dispatch(setPlanets(planets));
    })
}


const setPlanetsLoading = () => {
    return {
        type: types.PLANETS_LOADING
    }
}

const setPlanets = (planets) => {
    return {
        type: types.GET_PLANETS,
        payload: planets
    }
}