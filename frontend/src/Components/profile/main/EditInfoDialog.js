import React from 'react';
import * as yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { accountService } from '../../../services/account.service';
import { alertService } from '../../../services/alert.service';
import { Input } from '../../common/Input';
import { CircularProgress, FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import MomentUtils from '@date-io/moment';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';

const schema = yup.object().shape({
    firstName: yup
        .string()
        .matches(/^([^0-9]*)$/, 'First name should not contain numbers')
        .required('First name is a required field'),
    lastName: yup
        .string()
        .matches(/^([^0-9]*)$/, 'Last name should not contain numbers')
        .required('Last name is a required field'),
    username: yup.string().required('Username is a required field'),
    email: yup
        .string()
        .email('Email should have correct format')
        .required('Email is a required field'),
    sex: yup.string(),
});

export const EditInfoDialog = ({ open, handleClose }) => {
    const user = accountService.userValue;

    const {
        register,
        errors,
        reset,
        handleSubmit,
        control,
        formState: { isValid, isSubmitting },
    } = useForm({
        mode: 'onChange',
        resolver: yupResolver(schema),
        defaultValues: {
            firstName: user.firstName,
            lastName: user.lastName,
            username: user.username,
            email: user.email,
        },
    });

    const onSubmit = data => {
        alertService.clear();
        return accountService
            .update(user.id, data)
            .then(() => {
                alertService.success('Edited successfully!');
                setTimeout(handleClose, 500);
            })
            .catch(error => {
                alertService.error(error);
                reset();
            });
    };

    return (
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog">
            <DialogTitle id="form-dialog-title">Edit</DialogTitle>
            <DialogContent>
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
                <FormControl variant="outlined" margin="normal" style={{ width: '100%' }}>
                    <InputLabel id="gender">Gender</InputLabel>
                    <Controller
                        name="sex"
                        control={control}
                        defaultValue={user.sex || 'male'}
                        as={
                            <Select label="gender">
                                <MenuItem value="male">Male</MenuItem>
                                <MenuItem value="female">Female</MenuItem>
                                <MenuItem value="other">Other</MenuItem>
                            </Select>
                        }
                    />
                </FormControl>
                <FormControl margin="normal" style={{ width: '100%' }}>
                    <Controller
                        name="birthDate"
                        control={control}
                        defaultValue={user.birthDate || new Date()}
                        render={({ onChange, value }) => (
                            <MuiPickersUtilsProvider utils={MomentUtils}>
                                <DatePicker
                                    disableFuture
                                    inputVariant="outlined"
                                    openTo="year"
                                    format="Do MMMM YYYY"
                                    label="Pick your birthday"
                                    views={['year', 'month', 'date']}
                                    value={value}
                                    onChange={onChange}
                                />
                            </MuiPickersUtilsProvider>
                        )}
                    />
                </FormControl>
                <FormControl variant="outlined" margin="normal" style={{ width: '100%' }}>
                    <InputLabel id="sexualPreferences">Sexual preferences</InputLabel>
                    <Controller
                        name="sexualPreferences"
                        control={control}
                        defaultValue={user.sexualPreferences || 'both'}
                        as={
                            <Select label="sexualPreferences">
                                <MenuItem value="man">Man</MenuItem>
                                <MenuItem value="woman">Woman</MenuItem>
                                <MenuItem value="both">Both</MenuItem>
                            </Select>
                        }
                    />
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button disabled={!isValid || isSubmitting} onClick={handleSubmit(onSubmit)}>
                    {!isSubmitting ? 'Edit' : <CircularProgress size={24} />}
                </Button>
            </DialogActions>
        </Dialog>
    );
};
