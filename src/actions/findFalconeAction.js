import types from './types';
const GET_TOKEN_URL = 'https://findfalcone.herokuapp.com/token';
const FIND_FALCONE_URL = 'https://findfalcone.herokuapp.com/find';


const getToken = ()=>(dispatch)=>{
    fetch(GET_TOKEN_URL, {
        method: 'post',
        headers: {
            "Accept": "application/json"
        }
    }).then((res) => res.json()).then((resp) => {
        dispatch({
            type: types.GET_TOKEN,
            payload: resp
        })
    })
}

const findFalcone = (token,selections,callback) => {
    return (dispatch) => {
        let payload = {
            token,
            planet_names: selections.map((selection)=>{return selection.planet.name;}),
            vehicle_names: selections.map((selection)=>{return selection.vehicle.name;})
        }
        fetch(FIND_FALCONE_URL, {
            method: 'post',
            headers: {
                "Accept": "application/json"
            },
            body:JSON.stringify(payload)
        }).then((res) => res.json()).then((resp) => {
            dispatch({
                type: types.FIND_FALCONE,
                payload: resp
            });
            callback && callback();
        });
    }
}

export {
    getToken,
    findFalcone
}