import React                         from 'react';
import { 
    BrowserRouter as Router, 
    Route, 
    Redirect,
    Switch }                         from 'react-router-dom';
import FindFalcone                   from './pages/find-falcone/find-falcone';
import ResultPage                    from './pages/result/result-page';

const AppRoutes = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/findFalcone">
                    <FindFalcone/>
                </Route>
                <Route exact path="/result">
                    <ResultPage/>
                </Route>
                <Route path="/">
                    <Redirect to="/findFalcone" />
                </Route>
            </Switch>
        </Router>
    )
}

export default AppRoutes;