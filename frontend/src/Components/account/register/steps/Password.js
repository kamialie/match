import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers';
import { Form } from '../../../common/Form';
import { PrimaryButton } from '../../../common/PrimaryButton';
import { Input } from '../../../common/Input';
import { IconButton, InputAdornment } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';

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

export const Password = ({ data, onNext }) => {
    const { register, handleSubmit, errors } = useForm({
        defaultValues: {
            password: data.password,
            confirmPassword: data.confirmPassword,
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

    return (
        <>
            <Form onSubmit={handleSubmit(data => onNext(data))}>
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
                <PrimaryButton>Next</PrimaryButton>
            </Form>
        </>
    );
};
