import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import { Autocomplete } from '@material-ui/lab';
import { CircularProgress, TextField } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    autocomplete: {
        width: '100%',
        backgroundColor: 'white',
        borderRadius: '10px',
    },
    input: {
        borderRadius: '10px',
    },
}));

function sleep(delay = 0) {
    return new Promise(resolve => {
        setTimeout(resolve, delay);
    });
}

export const InterestsAutocomplete = ({ interests, onChange }) => {
    const [open, setOpen] = useState(false);
    const [options, setOptions] = useState([]);
    const loading = open && options.length === 0;

    const classes = useStyles();

    useEffect(() => {
        if (!loading) {
            return undefined;
        }

        (async () => {
            //TODO: get from backend
            const response = ['Vegan', 'Geek', 'Python', 'C#', 'Sber'];
            await sleep(1e3); // For demo purposes.

            setOptions(response);
        })();
    }, [loading]);

    return (
        <>
            <Autocomplete
                id="tags-filled"
                multiple
                freeSolo
                value={interests}
                className={classes.autocomplete}
                options={options}
                onOpen={() => setOpen(true)}
                onClose={() => setOpen(false)}
                onChange={(event, newValue) => {
                    onChange(newValue);
                }}
                renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                        <Chip color="primary" label={option} {...getTagProps({ index })} />
                    ))
                }
                renderInput={params => (
                    <TextField
                        {...params}
                        variant="outlined"
                        label="Write you interests"
                        placeholder="Favorites"
                        InputProps={{
                            ...params.InputProps,
                            classes: {
                                root: classes.input,
                            },
                            endAdornment: (
                                <React.Fragment>
                                    {loading ? (
                                        <CircularProgress color="inherit" size={20} />
                                    ) : null}
                                    {params.InputProps.endAdornment}
                                </React.Fragment>
                            ),
                        }}
                    />
                )}
            />
        </>
    );
};
