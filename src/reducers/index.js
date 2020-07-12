import { combineReducers }      from 'redux';
import vehiclesReducer          from './vehiclesReducer';
import errReducer               from './errReducer';
import planetsReducer           from './planetsReducer';
import userSelectionReducer     from './userSelectionReducer';

export default combineReducers({ errors: errReducer, planets: planetsReducer, vehicles: vehiclesReducer, userSelection: userSelectionReducer })