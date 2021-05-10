import React, { useEffect } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { accountService } from '../../services/account.service';
import { Login } from './Login';
import { ForgotPassword } from './ForgotPassword';
import { ResetPassword } from './ResetPassword';
import { Register } from './register/Register';

function Account({ history, match }) {
    const { path } = match;

    useEffect(() => {
        if (accountService.userValue) {
            history.push('/');
        }
    }, []);

    return (
        <>
            <Switch>
                <Route path={`${path}/login`} component={Login} />
                <Route path={`${path}/register`} component={Register} />
                <Route path={`${path}/forgot-password`} component={ForgotPassword} />
                <Route path={`${path}/reset-password`} component={ResetPassword} />
                <Redirect from={`${path}/`} to="/login" />
            </Switch>
        </>
    );
}

export { Account };
