import React from 'react';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Typography from '@material-ui/core/Typography';
import { useData } from './RegisterDataContext';
import { MainContainer } from '../../common/MainContainer';
import { Form } from '../../common/Form';
import { FileInput } from '../../common/FileInput';
import { PrimaryButton } from '../../common/PrimaryButton';

export const RegisterStep3 = () => {
    const history = useHistory();
    const { data, setValues } = useData();
    const { control, handleSubmit } = useForm({
        defaultValues: {
            files: data.files,
        },
    });

    const onSubmit = data => {
        setValues(data);
        history.push('./result');
    };

    const onBack = event => {
        event.preventDefault();
        history.push('./step2');
    };

    return (
        <MainContainer>
            <Typography component="h2" variant="h5">
                🦄 Step 3
            </Typography>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <FileInput name="files" control={control} />
                <PrimaryButton>Next</PrimaryButton>
                <PrimaryButton onClick={event => onBack(event)}>Back</PrimaryButton>
            </Form>
        </MainContainer>
    );
};
