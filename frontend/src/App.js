import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect, useLocation } from 'react-router-dom';
import { YMaps } from 'react-yandex-maps';
import { Box } from '@material-ui/core';
import { accountService } from './services/account.service';
import { Account } from './Components/account';
import { PrivateRoute } from './Components/PrivateRoute';
import { Home } from './Components/home/Home';
import { Alert } from './Components/Alert';
import { Profile } from './Components/profile';
import { Footer } from './Components/footer/Footer';
import { NavBar } from './Components/Nav';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        position: 'relative',
        backgroundColor: '#E8E8EC',
    },
});

function App() {
    const { pathname } = useLocation();
    const [user, setUser] = useState({});
    const classes = useStyles();

    useEffect(() => {
        const subscription = accountService.user.subscribe(x => setUser(x));
        return subscription.unsubscribe;
    }, []);

    return (
        <Box className={classes.root}>
            <YMaps>
                <Alert />
                <NavBar />
                <Switch>
                    <Redirect from="/:url*(/+)" to={pathname.slice(0, -1)} />
                    <PrivateRoute exact path="/" component={Home} />
                    <PrivateRoute path="/profile" component={Profile} />
                    <Route path="/account" component={Account} />
                    <Redirect from="*" to="/" />
                </Switch>
            </YMaps>
            <Footer />
        </Box>
    );
}

export default App;
