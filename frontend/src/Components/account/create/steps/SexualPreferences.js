import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@material-ui/core';
import { PrimaryButton } from '../../../common/PrimaryButton';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
    },
    legend: {
        marginBottom: '0.5rem',
    },
}));

export const SexualPreferences = ({ data, onNext }) => {
    const [value, setValue] = useState(data.sexualPreferences ? data.sexualPreferences : 'both');
    const classes = useStyles();

    const handleChange = event => {
        setValue(event.target.value);
    };

    return (
        <>
            <FormControl component="fieldset" className={classes.root}>
                <FormLabel component="legend" className={classes.legend}>
                    Who do you prefer?
                </FormLabel>
                <RadioGroup
                    aria-label="Sexual preferences"
                    name="Sexual preferences"
                    value={value}
                    onChange={handleChange}
                >
                    <FormControlLabel value="woman" control={<Radio />} label="Woman" />
                    <FormControlLabel value="man" control={<Radio />} label="Man" />
                    <FormControlLabel value="both" control={<Radio />} label="Both" />
                </RadioGroup>
            </FormControl>
            <PrimaryButton onClick={() => onNext({ sexualPreferences: value })}>Next</PrimaryButton>
        </>
    );
};
