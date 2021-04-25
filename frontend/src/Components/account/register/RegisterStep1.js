import React from 'react';
import { useHistory } from 'react-router-dom';
import { useData } from './RegisterDataContext';
import Typography from '@material-ui/core/Typography';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';
import * as yup from 'yup';
import { MainContainer } from '../../common/MainContainer';
import { Form } from '../../common/Form';
import { Input } from '../../common/Input';
import { PrimaryButton } from '../../common/PrimaryButton';

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

export const RegisterStep1 = ({ match }) => {
    const { setValues, data } = useData();
    const history = useHistory();
    const { register, handleSubmit, errors } = useForm({
        defaultValues: { firstName: data.firstName, lastName: data.lastName },
        mode: 'onBlur',
        resolver: yupResolver(schema),
    });

    const { path } = match;

    const onSubmit = data => {
        history.push(`${path}step2`);
        setValues(data);
    };

    return (
        <MainContainer>
            <Typography component="h2" variant="h5">
                🦄 Step 1
            </Typography>
            <Form onSubmit={handleSubmit(onSubmit)}>
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
        </MainContainer>
    );
};
