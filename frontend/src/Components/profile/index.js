import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Details } from './main/Details';
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import Settings from './settings';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        padding: '3rem',
        width: '100%',
        boxSizing: 'border-box',
        flexGrow: 1,
    },
}));

function Profile({ match }) {
    const { path } = match;

    const classes = useStyles();

    return (
        <Box className={classes.root}>
            <Switch>
                <Redirect exact from="/profile" to="/profile/me" />
                <Route path={`${path}/me`} component={Details} />
                <Route path={`${path}/settings`} component={Settings} />
                <Route path={`${path}/settings:type`} component={Settings} />
                <Route path="/profile/:userId?" component={Details} />
            </Switch>
        </Box>
    );
}

export { Profile };
