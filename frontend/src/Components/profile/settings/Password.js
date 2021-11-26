import React, { useState } from 'react';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';
import { accountService } from '../../../services/account.service';
import { Form } from '../../common/Form';
import { Input } from '../../common/Input';
import { IconButton, InputAdornment } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { PrimaryButton } from '../../common/PrimaryButton';
import { alertService } from '../../../services/alert.service';

const schema = yup.object().shape({
    // TODO: закомментировать в проде
    password: yup
        .string()
        // .min(6, 'Password must be at least 6 characters')
        .required('Password is a required field'),
    confirmPassword: yup
        .string()
        // .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Confirm password is a required field'),
});

const Password = () => {
    const user = accountService.userValue;

    const [isLoading, setLoading] = useState(false);

    const { register, handleSubmit, errors } = useForm({
        defaultValues: {
            password: user.password,
            confirmPassword: user.password,
        },
        mode: 'onBlur',
        resolver: yupResolver(schema),
    });

    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = event => {
        event.preventDefault();
    };

    const onSubmit = data => {
        alertService.clear();
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Input
                ref={register}
                id="password"
                type={showPassword ? 'text' : 'password'}
                label="Password"
                name="password"
                error={!!errors.password}
                helperText={errors?.password?.message}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                            >
                                {showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
            />
            <Input
                ref={register}
                id="confirmPassword"
                type={showPassword ? 'text' : 'password'}
                label="Confirm password"
                name="confirmPassword"
                error={!!errors.confirmPassword}
                helperText={errors?.confirmPassword?.message}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                            >
                                {showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
            />
            <PrimaryButton disabled={isLoading} isLoading={isLoading} onClick={onSubmit}>
                Submit
            </PrimaryButton>
        </Form>
    );
};

export default Password;
