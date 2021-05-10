import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';
import * as yup from 'yup';
import { Form } from '../../../common/Form';
import { Input } from '../../../common/Input';
import { PrimaryButton } from '../../../common/PrimaryButton';

const schema = yup.object().shape({
    firstName: yup
        .string()
        .matches(/^([^0-9]*)$/, 'First name should not contain numbers')
        .required('First name is a required field'),
    lastName: yup
        .string()
        .matches(/^([^0-9]*)$/, 'Last name should not contain numbers')
        .required('Last name is a required field'),
});

export const Names = ({ data, onNext }) => {
    const { register, handleSubmit, errors } = useForm({
        defaultValues: { firstName: data.firstName, lastName: data.lastName },
        mode: 'onBlur',
        resolver: yupResolver(schema),
    });

    return (
        <>
            <Form onSubmit={handleSubmit(data => onNext(data))}>
                <Input
                    ref={register}
                    id="firstName"
                    type="text"
                    label="First Name"
                    name="firstName"
                    error={!!errors.firstName}
                    helperText={errors?.firstName?.message}
                />
                <Input
                    ref={register}
                    id="lastName"
                    type="text"
                    label="Last Name"
                    name="lastName"
                    error={!!errors.lastName}
                    helperText={errors?.lastName?.message}
                />
                <PrimaryButton>Next</PrimaryButton>
            </Form>
        </>
    );
};
