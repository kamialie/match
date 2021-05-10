import React from 'react';
import { accountService } from '../../services/account.service';
import { CreateAccount } from '../account/create/CreateAccount';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Grid } from '@material-ui/core';
import { UserCard } from './UserCard';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        padding: '3rem',
        width: '100%',
        boxSizing: 'border-box',
        flexGrow: 1,
    },
    grid: {
        maxHeight: '100%',
        overflow: 'auto',
    },
}));

function Home() {
    const user = accountService.userValue;

    const classes = useStyles();

    return (
        <>
            {user.status === 0 && <CreateAccount />}
            {user.status === 1 && (
                <Box className={classes.root}>
                    <h1>Hi, {user.username}!</h1>
                    <p>{JSON.stringify(user)}</p>
                    <Box className={classes.grid}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Grid container justify="center" spacing={2}>
                                    {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(value => (
                                        <Grid key={value} item>
                                            <UserCard />
                                        </Grid>
                                    ))}
                                </Grid>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            )}
        </>
    );
}

export { Home };
