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

export const Gender = ({ data, onNext }) => {
    const [value, setValue] = useState(data.sex ? data.sex : 'male');
    const classes = useStyles();

    const handleChange = event => {
        setValue(event.target.value);
    };

    return (
        <>
            <FormControl component="fieldset" className={classes.root}>
                <FormLabel component="legend" className={classes.legend}>
                    What is your gender?
                </FormLabel>
                <RadioGroup aria-label="gender" name="gender" value={value} onChange={handleChange}>
                    <FormControlLabel value="female" control={<Radio />} label="Female" />
                    <FormControlLabel value="male" control={<Radio />} label="Male" />
                    <FormControlLabel value="other" control={<Radio />} label="Other" />
                </RadioGroup>
            </FormControl>
            <PrimaryButton onClick={() => onNext({ sex: value })}>Next</PrimaryButton>
        </>
    );
};
