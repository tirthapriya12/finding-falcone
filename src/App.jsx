import React            from 'react';
import { Provider }     from 'react-redux';
import store            from './store';
import AppRoutes        from './routes';
import './App.scss';

const App = () => {
    return (
        <Provider store={store}>
            <AppRoutes />
        </Provider>
    );
}

export default App;