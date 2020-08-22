import React                         from 'react';
import { 
    BrowserRouter as Router, 
    Route, 
    Redirect,
    Switch }                         from 'react-router-dom';
import Header                        from './components/header/header';
import Footer                        from './components/footer/footer';
import FindFalcone                   from './pages/find-falcone/find-falcone';
import ResultPage                    from './pages/result/result-page';

const AppRoutes = () => {
    return (
        <Router>
            <Header />
            <Switch>
                <Route exact path="/intro">

                </Route>
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
            <Footer />
        </Router>
    )
}

export default AppRoutes;