import React, { useState } from 'react';
import { TextareaAutosize } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { PrimaryButton } from '../../../common/PrimaryButton';

const useStyles = makeStyles(theme => ({
    biography: {
        width: '100%',
        resize: 'none',
        borderRadius: '10px',
    },
}));

export const Biography = ({ data, onNext }) => {
    const [value, setValue] = useState(data.biography);
    const classes = useStyles();

    const handleChange = event => {
        setValue(event.target.value);
    };

    return (
        <>
            <TextareaAutosize
                className={classes.biography}
                value={value}
                onChange={handleChange}
                aria-label="minimum height"
                rowsMin={3}
                placeholder="Write something about yourself"
            />
            <PrimaryButton onClick={() => onNext({ biography: value })}>Next</PrimaryButton>
        </>
    );
};
