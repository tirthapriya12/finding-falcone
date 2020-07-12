import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
const middleware = [thunk];
let initialState = {};

export default createStore(
    rootReducer,
    initialState,
    applyMiddleware(...middleware));