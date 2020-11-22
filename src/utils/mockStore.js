import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
const middleware = [thunk];

export const mockStore = configureMockStore(middleware);
