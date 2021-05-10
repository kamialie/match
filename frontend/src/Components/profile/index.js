import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { Update } from './Update';
import { Details } from './Details';
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';

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
                <Route exact path={path} component={Details} />
                <Route path={`${path}/update`} component={Update} />
            </Switch>
        </Box>
    );
}

export { Profile };
