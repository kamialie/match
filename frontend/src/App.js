import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect, useLocation } from 'react-router-dom';
import io from 'socket.io-client';
import { YMaps } from 'react-yandex-maps';
import { Box, CssBaseline, Grid, ThemeProvider } from '@material-ui/core';
import { accountService } from './services/account.service';
import { Account } from './Components/account';
import { PrivateRoute } from './routing/PrivateRoute';
import { Alert } from './Components/alert/Alert';
import { Profile } from './Components/profile';
import { Footer } from './Components/footer/Footer';
import Navbar from './Components/navbar/index';
import Visits from './Components/visits/Visits';
import Matches from './Components/matches/Matches';
import theme from './styles/theme';

import { componentStyles } from './styles/component';
import { contextDefaultValue, ServiceContext } from './services/serviceContext';
import Likes from './Components/likes/Likes';

function App() {
    const { pathname } = useLocation();
    const [user, setUser] = useState({});
    const [darkMode, setDarkMode] = useState(false);

    const classes = componentStyles();

    const socket = io();

    const contextValue = contextDefaultValue;

    contextValue.socket = socket;

    useEffect(() => {
        const subscription = accountService.user.subscribe(x => setUser(x));

        return () => {
            socket.close();
            subscription.unsubscribe();
        };
    }, []);

    // useEffect(() => {
    //     const subscription = filterService.filter.subscribe();
    //     return subscription.unsubscribe;
    // }, []);

    // const themeLight = createMuiTheme({
    //     palette: {
    //         type: 'light',
    //         background: {
    //             default: '#e8e8ec',
    //         },
    //     },
    // });
    //
    // const themeDark = createMuiTheme({
    //     palette: {
    //         type: 'dark',
    //         primary: {
    //             dark: '#825db0',
    //             main: '#bb86fc',
    //             light: '#c89efc',
    //         },
    //         secondary: {
    //             dark: '#02988a',
    //             main: '#03dac6',
    //             light: '#35e1d1',
    //         },
    //         error: {
    //             main: '#cf6679',
    //         },
    //     },
    // });

    return (
        <ThemeProvider theme={theme}>
            <ServiceContext.Provider value={contextValue}>
                <CssBaseline />
                <Box display="flex" flexDirection="column" minHeight="100vh" position="relative">
                    <YMaps>
                        <Alert />
                        <Navbar />
                        <Box flexGrow={1}>
                            <Grid className={classes.minHeight} container>
                                <Grid justify="center" container item md={12} xs={12}>
                                    <Box
                                        pt={{ xs: '0px', sm: '64px' }}
                                        mb={{ xs: '100px', sm: '0' }}
                                        width={user && user.status !== 1 ? '100%' : 'auto'}
                                    >
                                        <Switch>
                                            <Redirect
                                                from="/:url*(/+)"
                                                to={pathname.slice(0, -1)}
                                            />
                                            <PrivateRoute path="/profile" component={Profile} />
                                            <Route path="/account" component={Account} />
                                            <Redirect
                                                exact
                                                from="/matches"
                                                to="/matches/recommend"
                                            />
                                            <PrivateRoute
                                                exact
                                                path="/matches/:page?"
                                                component={Matches}
                                            />
                                            <Redirect exact from="/visits" to="/visits/allVisits" />
                                            <PrivateRoute
                                                exact
                                                path="/visits/:page?"
                                                component={Visits}
                                            />
                                            <Redirect exact from="/likes" to="/likes/likesyou" />
                                            <PrivateRoute
                                                exact
                                                path="/likes/:page?"
                                                component={Likes}
                                            />
                                            <Redirect from="*" to="/matches" />
                                        </Switch>
                                    </Box>
                                </Grid>
                                {/*<Circle />*/}
                            </Grid>
                        </Box>
                    </YMaps>
                    <Footer />
                </Box>
            </ServiceContext.Provider>
        </ThemeProvider>
    );
}

export default App;
