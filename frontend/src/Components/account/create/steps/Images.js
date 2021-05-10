import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Form } from '../../../common/Form';
import { FileInput } from '../../../common/FileInput';
import { PrimaryButton } from '../../../common/PrimaryButton';

export const Images = ({ data, onNext }) => {
    const methods = useForm({
        mode: 'onBlur',
        defaultValues: {
            images: data.images,
        },
    });

    const onSubmit = methods.handleSubmit(values => {
        onNext(values);
    });

    return (
        <FormProvider {...methods}>
            <Form onSubmit={onSubmit}>
                <FileInput accept="image/*" multiple name="images" mode="append" />
                <PrimaryButton>Next</PrimaryButton>
            </Form>
        </FormProvider>
    );
};
