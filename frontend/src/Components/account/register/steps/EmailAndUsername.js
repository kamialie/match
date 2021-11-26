import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';
import * as yup from 'yup';
import { Form } from '../../../common/Form';
import { Input } from '../../../common/Input';
import { PrimaryButton } from '../../../common/PrimaryButton';

const schema = yup.object().shape({
    username: yup.string().required('Username is a required field'),
    email: yup
        .string()
        .email('Email should have correct format')
        .required('Email is a required field'),
});

export const EmailAndUsername = ({ data, onNext }) => {
    const { register, handleSubmit, errors } = useForm({
        defaultValues: {
            username: data.username,
            email: data.email,
        },
        mode: 'onBlur',
        resolver: yupResolver(schema),
    });

    return (
        <>
            <Form onSubmit={handleSubmit(data => onNext(data))}>
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
                    id="email"
                    type="text"
                    label="Email"
                    name="email"
                    error={!!errors.email}
                    helperText={errors?.email?.message}
                />
                <PrimaryButton>Next</PrimaryButton>
            </Form>
        </>
    );
};
