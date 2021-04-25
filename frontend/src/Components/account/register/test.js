import React from 'react';
import { Route, Switch, BrowserRouter as Router, Link } from 'react-router-dom';
import { DataProvider } from './RegisterDataContext';
import { RegisterStep1 } from './RegisterStep1';
import { RegisterStep2 } from './RegisterStep2';
import { RegisterStep3 } from './RegisterStep3';
import { RegisterResult } from './RegisterResult';

export const Test = ({ match }) => {
    const { path } = match;

    return (
        <DataProvider>
            <Router>
                <Switch>
                    <Route exact path={`${path}/`} component={RegisterStep1} />
                    <Route path={`${path}/step2`} component={RegisterStep2} />
                    <Route path={`${path}/step3`} component={RegisterStep3} />
                    <Route path={`${path}/result`} component={RegisterResult} />
                </Switch>
            </Router>
            <Link to="login" className="btn btn-link">
                Cancel
            </Link>
        </DataProvider>
    );
};
