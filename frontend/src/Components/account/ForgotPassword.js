import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';
import * as yup from 'yup';
import { Box, IconButton, Paper, Tooltip, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ArrowBackIosOutlinedIcon from '@material-ui/icons/ArrowBackIosOutlined';
import { accountService } from '../../services/account.service';
import { alertService } from '../../services/alert.service';
import { MainContainer } from '../common/MainContainer';
import { Input } from '../common/Input';
import { PrimaryButton } from '../common/PrimaryButton';
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
}));

const schema = yup.object().shape({
    email: yup.string().email('Email is invalid').required('Email is a required field'),
});

export const ForgotPassword = ({ history }) => {
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

    const onBack = event => {
        event.preventDefault();
        history.push('./');
    };

    const onSubmit = data => {
        alertService.clear();
        accountService
            .forgotPassword(data.email)
            .then(() => {
                alertService.success('Please, check your email for password reset instructions', {
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
        <MainContainer>
            <Paper className={classes.paper}>
                <Box className={classes.root}>
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
                    <Typography component="h2" variant="h5">
                        Forgot Password
                    </Typography>
                </Box>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Input
                        ref={register}
                        id="email"
                        type="email"
                        label="Email"
                        name="email"
                        error={!!errors.email}
                        helperText={errors?.email?.message}
                    />
                    <PrimaryButton disabled={!isValid || isSubmitted} isLoading={isSubmitted}>
                        Restore
                    </PrimaryButton>
                </Form>
            </Paper>
        </MainContainer>
    );
};
