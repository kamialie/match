import React, {useState, useEffect} from 'react';
import {
    Route, Switch, Redirect, useLocation
} from 'react-router-dom';

import {accountService} from './services/account.service';
import {Account} from './Components/account';
import {PrivateRoute} from './Components/PrivateRoute';
import {Home} from './Components/home/Home';
import {Alert} from './Components/Alert';
import {Profile} from './Components/profile';
import {Nav} from './Components/Nav';

function App() {
    const {pathname} = useLocation();

    const [user, setUser] = useState({});

    useEffect(() => {
        const subscription = accountService.user.subscribe((x) => setUser(x));
        return subscription.unsubscribe;
    }, []);

    return (
        <div className={`app-container${user && ' bg-light'}`}>
            <Alert />
            <Nav />
            <Switch>
                <Redirect from='/:url*(/+)' to={pathname.slice(0, -1)} />
                <PrivateRoute exact path='/' component={Home} />
                <PrivateRoute path='/profile' component={Profile} />
                <Route path='/account' component={Account} />
                <Redirect from='*' to='/' />
            </Switch>
        </div>
    );
}

export default App;
