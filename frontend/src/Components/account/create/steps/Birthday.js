import React, { useState } from 'react';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import { makeStyles } from '@material-ui/core/styles';
import { PrimaryButton } from '../../../common/PrimaryButton';

const useStyles = makeStyles(theme => ({
    dataPicker: {
        width: '100%',
    },
}));

export const Birthday = ({ data, onNext }) => {
    const [selectedDate, handleDateChange] = useState(data.birthDate ? data.birthDate : new Date());
    const classes = useStyles();

    return (
        <>
            <MuiPickersUtilsProvider utils={MomentUtils}>
                <DatePicker
                    disableFuture
                    className={classes.dataPicker}
                    openTo="year"
                    format="Do MMMM YYYY"
                    label="Pick your birthday"
                    views={['year', 'month', 'date']}
                    value={selectedDate}
                    onChange={handleDateChange}
                />
            </MuiPickersUtilsProvider>
            <PrimaryButton onClick={() => onNext({ birthDate: selectedDate })}>Next</PrimaryButton>
        </>
    );
};
