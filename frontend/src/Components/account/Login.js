import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers';
import { Avatar, Grid, Paper, Typography } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
import { accountService } from '../../services/account.service';
import { alertService } from '../../services/alert.service';
import { MainContainer } from '../common/MainContainer';
import { Input } from '../common/Input';
import { PrimaryButton } from '../common/PrimaryButton';
import { Form } from '../common/Form';

const schema = yup.object().shape({
    username: yup.string().required('Username is a required field'),
    password: yup.string().required('Password is a required field'),
});

const useStyles = makeStyles(theme => ({
    paper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '2rem',
        width: '100%',
        borderRadius: '1rem',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
}));

export const Login = ({ history, location }) => {
    const {
        register,
        handleSubmit,
        errors,
        reset,
        formState: { isSubmitted, isValid },
    } = useForm({
        mode: 'onChange',
        resolver: yupResolver(schema),
    });
    const classes = useStyles();

    const onSubmit = data => {
        alertService.clear();
        accountService
            .login(data.username, data.password)
            .then(() => {
                const { from } = location.state || { from: { pathname: '/' } };
                history.push(from);
            })
            .catch(error => {
                alertService.error(error);
                reset();
            });
    };

    return (
        <MainContainer>
            <Paper className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h2" variant="h5">
                    Login
                </Typography>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Input
                        ref={register}
                        id="username"
                        type="text"
                        label="Username"
                        name="username"
                        error={!!errors.username}
                        helperText={errors?.username?.message}
                    />
                    <Input
                        ref={register}
                        id="password"
                        type="text"
                        label="Password"
                        name="password"
                        error={!!errors.password}
                        helperText={errors?.password?.message}
                    />
                    <PrimaryButton disabled={!isValid || isSubmitted} isLoading={isSubmitted}>
                        Login
                    </PrimaryButton>
                    <Grid container direction="row" justify="space-between" alignItems="center">
                        <Link to="register">Register</Link>
                        <Link to="forgot-password">Forgot Password?</Link>
                    </Grid>
                </Form>
            </Paper>
        </MainContainer>
    );
};
