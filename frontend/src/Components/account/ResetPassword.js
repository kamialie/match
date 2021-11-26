import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import queryString from 'query-string';
import { Box, CircularProgress, IconButton, Paper, Tooltip, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ArrowBackIosOutlinedIcon from '@material-ui/icons/ArrowBackIosOutlined';
import { yupResolver } from '@hookform/resolvers';
import * as yup from 'yup';
import { accountService } from '../../services/account.service';
import { alertService } from '../../services/alert.service';
import { Input } from '../common/Input';
import { PrimaryButton } from '../common/PrimaryButton';
import { MainContainer } from '../common/MainContainer';
import { Form } from '../common/Form';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    paper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '2rem',
        borderRadius: '1rem',
        width: '100%',
    },
    backButton: {
        marginLeft: '-2rem',
    },
    circle: {
        marginLeft: '10px',
    },
    validationTitle: {
        marginBottom: '30px',
    },
}));

const schema = yup.object().shape({
    password: yup
        .string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is a required required'),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref('password'), null], 'Passwords must match')
        .required('Confirm password is a required required'),
});

export const ResetPassword = ({ history }) => {
    const TokenStatus = {
        Validating: 'Validating',
        Valid: 'Valid',
        Invalid: 'Invalid',
    };

    const [token, setToken] = useState(null);
    const [tokenStatus, setTokenStatus] = useState(TokenStatus.Validating);

    const onBack = event => {
        event.preventDefault();
        history.push('./');
    };

    useEffect(() => {
        const { token } = queryString.parse(location.search);

        // remove token from url to prevent http referer leakage
        history.replace(location.pathname);

        accountService
            .validateResetToken(token)
            .then(() => {
                setToken(token);
                setTokenStatus(TokenStatus.Valid);
            })
            .catch(() => {
                setTokenStatus(TokenStatus.Invalid);
            });
    }, []);

    const {
        register,
        handleSubmit,
        errors,
        formState: { isSubmitted, isValid },
        reset,
    } = useForm({
        mode: 'onChange',
        resolver: yupResolver(schema),
    });

    const classes = useStyles();

    function getForm() {
        const onSubmit = data => {
            alertService.clear();
            accountService
                .resetPassword({
                    token,
                    password: data.password,
                    confirmPassword: data.confirmPassword,
                })
                .then(() => {
                    alertService.success('Password reset successful, you can now login', {
                        keepAfterRouteChange: true,
                    });
                    history.push('./');
                })
                .catch(error => {
                    alertService.error(error);
                    reset();
                });
        };

        return (
            <>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Input
                        ref={register}
                        id="password"
                        type="password"
                        label="Password"
                        name="password"
                        error={!!errors.password}
                        helperText={errors?.password?.message}
                    />
                    <Input
                        ref={register}
                        id="confirmPassword"
                        type="password"
                        label="Confirm password"
                        name="confirmPassword"
                        error={!!errors.confirmPassword}
                        helperText={errors?.confirmPassword?.message}
                    />
                    <PrimaryButton disabled={!isValid || isSubmitted} isLoading={isSubmitted}>
                        Reset password
                    </PrimaryButton>
                </Form>
            </>
        );
    }

    function getBody() {
        switch (tokenStatus) {
            case TokenStatus.Invalid:
                return getForm();
            case TokenStatus.Valid:
                return (
                    <Typography variant="subtitle1" align="center">
                        Token validation failed, if the token has expired you can get a new one at
                        the <Link to="forgot-password">Forgot password</Link> page.
                    </Typography>
                );
            case TokenStatus.Validating:
                return (
                    <Box display="flex" flexDirection="column" alignItems="center">
                        <Typography variant="subtitle2" className={classes.validationTitle}>
                            Validating token...
                        </Typography>
                        <CircularProgress />
                    </Box>
                );
        }
    }

    return (
        <MainContainer>
            <Paper className={classes.paper}>
                <Box className={classes.root}>
                    {tokenStatus === TokenStatus.Valid && (
                        <Tooltip title="Move to login" placement="top">
                            <IconButton
                                color="primary"
                                component="span"
                                className={classes.backButton}
                                onClick={event => onBack(event)}
                            >
                                <ArrowBackIosOutlinedIcon />
                            </IconButton>
                        </Tooltip>
                    )}
                    <Typography component="h2" variant="h5">
                        Reset Password
                    </Typography>
                </Box>
                <>{getBody()}</>
            </Paper>
        </MainContainer>
    );
};
