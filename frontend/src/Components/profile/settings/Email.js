import React, { useState } from 'react';
import { FormGroup, Grid } from '@material-ui/core';
import { accountService } from '../../../services/account.service';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';
import { alertService } from '../../../services/alert.service';
import { Input } from '../../common/Input';
import { PrimaryButton } from '../../common/PrimaryButton';
import { Form } from '../../common/Form';

const schema = yup.object().shape({
    email: yup
        .string()
        .email('Email should have correct format')
        .required('Email is a required field'),
});

const Email = () => {
    const user = accountService.userValue;

    const [isLoading, setLoading] = useState(false);

    const { register, handleSubmit, errors } = useForm({
        defaultValues: {
            email: user.email,
        },
        mode: 'onBlur',
        resolver: yupResolver(schema),
    });

    const onSubmit = data => {
        alertService.clear();
    };

    return (
        <Form onSubmit={handleSubmit}>
            <FormGroup>
                <Grid container direction="column" spacing={1}>
                    <Grid item>
                        <Input
                            ref={register}
                            id="email"
                            type="text"
                            label="Email"
                            name="email"
                            error={!!errors.email}
                            helperText={errors?.email?.message}
                        />
                    </Grid>
                </Grid>
                <PrimaryButton disabled={isLoading} isLoading={isLoading} onClick={onSubmit}>
                    Submit
                </PrimaryButton>
            </FormGroup>
        </Form>
    );
};

export default Email;
