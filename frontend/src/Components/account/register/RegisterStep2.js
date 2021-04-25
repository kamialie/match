import React from 'react';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import * as yup from 'yup';
import { useData } from './RegisterDataContext';
import { MainContainer } from '../../common/MainContainer';
import { Form } from '../../common/Form';
import { Input } from '../../common/Input';
import { PrimaryButton } from '../../common/PrimaryButton';

const schema = yup.object().shape({
    email: yup
        .string()
        .email('Email should have correct format')
        .required('Email is a required field'),
});

export const RegisterStep2 = () => {
    const { setValues, data } = useData();
    const history = useHistory();
    const { register, handleSubmit, watch, errors } = useForm({
        defaultValues: {
            email: data.email,
            hasPhone: data.hasPhone,
            phoneNumber: data.phoneNumber,
        },
        mode: 'onBlur',
        resolver: yupResolver(schema),
    });
    const hasPhone = watch('hasPhone');

    const onSubmit = data => {
        setValues(data);
        history.push('./step3');
    };

    const onBack = event => {
        event.preventDefault();
        history.push('./');
    };

    return (
        <MainContainer>
            <Typography component="h2" variant="h5">
                🦄 Step 2
            </Typography>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Input
                    ref={register}
                    id="email"
                    type="email"
                    label="Email"
                    name="email"
                    error={!!errors.email}
                    helperText={errors?.email?.message}
                    required
                />

                <FormControlLabel
                    control={
                        <Checkbox
                            defaultValue={data.hasPhone}
                            defaultChecked={data.hasPhone}
                            color="primary"
                            inputRef={register}
                            name="hasPhone"
                        />
                    }
                    label="Do you have a phone"
                />

                {hasPhone && (
                    <Input
                        ref={register}
                        id="phoneNumber"
                        type="tel"
                        label="Phone Number"
                        name="phoneNumber"
                    />
                )}
                <PrimaryButton>Next</PrimaryButton>
                <PrimaryButton onClick={event => onBack(event)}>Back</PrimaryButton>
            </Form>
        </MainContainer>
    );
};
