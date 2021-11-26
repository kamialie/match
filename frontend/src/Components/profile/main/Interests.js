import React, { useState } from 'react';
import { Box, Button, CircularProgress, IconButton, Tooltip, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import Chip from '@material-ui/core/Chip';
import { accountService } from '../../../services/account.service';
import { alertService } from '../../../services/alert.service';
import { InterestsAutocomplete } from '../../common/InterestsAutocomplete';

const useStyles = makeStyles(theme => ({
    mainInfo: {
        padding: '1rem',
        border: '2px solid #3f51b5',
        borderRadius: '10px',
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        marginBottom: '1rem',
    },
    interests: {
        display: 'flex',
        overflowWrap: 'anywhere',
        fontSize: '20px',
    },
    interest: {
        marginRight: '0.5rem',
        fontSize: '20px',
    },
    saveButton: {
        marginLeft: '0.5rem',
    },
}));

export const Interests = ({ type }) => {
    const user = accountService.userValue;
    const classes = useStyles();

    const [interests, setInterests] = useState(user.interests || []);
    const [disabled, setDisabled] = useState(true);
    const [isEdit, setIsEdit] = useState(false);
    const [isUpdating, setUpdating] = useState(false);

    const onInterestsSave = () => {
        accountService.update(user.id, { interests }).then(() => {
            alertService.success('Success update interests!');
            setDisabled(true);
            setIsEdit(false);
            setUpdating(false);
        });
    };

    const onInterestsChange = newValue => {
        setInterests(newValue);
        setDisabled(false);
    };

    const onInterestsCancel = () => {
        setInterests(user.interests || []);
        setDisabled(true);
        setIsEdit(false);
    };

    return (
        <div className={classes.mainInfo}>
            <div className={classes.header}>
                <Typography component="h2" variant="h6">
                    Interests
                </Typography>
                {type === 'myProfile' && (
                    <Tooltip title="Click to edit interests" placement="bottom">
                        <IconButton aria-label="edit" onClick={() => setIsEdit(!isEdit)}>
                            <EditIcon />
                        </IconButton>
                    </Tooltip>
                )}
            </div>
            <>
                {!isEdit ? (
                    <>
                        {interests?.length ? (
                            <Box className={classes.interests}>
                                {interests.map((interest, index) => (
                                    <div className={classes.interest} key={index}>
                                        <Chip label={interest} color="primary" />
                                    </div>
                                ))}
                            </Box>
                        ) : (
                            <p className={classes.interests}>Choose your interests</p>
                        )}
                    </>
                ) : (
                    <>
                        <InterestsAutocomplete interests={interests} onChange={onInterestsChange} />
                        <Box display="flex" justifyContent="flex-end" mt={1}>
                            <Button
                                variant="outlined"
                                color="secondary"
                                onClick={onInterestsCancel}
                            >
                                Cancel
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                className={classes.saveButton}
                                disabled={disabled}
                                onClick={onInterestsSave}
                            >
                                {!isUpdating ? 'Save' : <CircularProgress size={24} />}
                            </Button>
                        </Box>
                    </>
                )}
            </>
        </div>
    );
};
