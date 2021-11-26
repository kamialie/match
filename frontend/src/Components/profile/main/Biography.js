import React, { useState } from 'react';
import {
    Box,
    Button,
    CircularProgress,
    IconButton,
    TextareaAutosize,
    Tooltip,
    Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import { accountService } from '../../../services/account.service';
import { alertService } from '../../../services/alert.service';

const useStyles = makeStyles(theme => ({
    mainInfo: {
        padding: '1rem',
        border: '2px solid #3f51b5',
        borderRadius: '10px',
        marginBottom: '1rem',
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        marginBottom: '1rem',
    },
    textArea: {
        width: '100%',
        resize: 'none',
        borderRadius: '10px',
        padding: '0.5rem',
        fontSize: '20px',
    },
    biography: {
        overflowWrap: 'anywhere',
        fontSize: '20px',
    },
    saveButton: {
        marginLeft: '0.5rem',
    },
}));

export const Biography = ({ type }) => {
    const user = accountService.userValue;
    const classes = useStyles();

    const [biography, setBiography] = useState(user.biography);
    const [disabled, setDisabled] = useState(true);
    const [isEdit, setIsEdit] = useState(false);
    const [isUpdating, setUpdating] = useState(false);

    const onBiographyChange = event => {
        setBiography(event.target.value);
        setDisabled(false);
    };

    const onBiographySave = () => {
        setUpdating(true);
        accountService.update(user.id, { biography }).then(() => {
            alertService.success('Success update biography!');
            setDisabled(true);
            setIsEdit(false);
            setUpdating(false);
        });
    };

    const onBiographyCancel = () => {
        setBiography(user.biography || '');
        setDisabled(true);
        setIsEdit(false);
    };

    return (
        <div className={classes.mainInfo}>
            <div className={classes.header}>
                <Typography component="h2" variant="h6">
                    Biography
                </Typography>
                {type === 'myProfile' && (
                    <Tooltip title="Click to edit biography" placement="bottom">
                        <IconButton aria-label="edit" onClick={() => setIsEdit(!isEdit)}>
                            <EditIcon />
                        </IconButton>
                    </Tooltip>
                )}
            </div>
            <>
                {!isEdit ? (
                    <p className={classes.biography}>
                        {biography ? biography : 'Write something about yourself'}
                    </p>
                ) : (
                    <div>
                        <TextareaAutosize
                            className={classes.textArea}
                            value={biography}
                            onChange={onBiographyChange}
                            rowsMin={3}
                            placeholder="Write something about yourself"
                        />
                        <Box display="flex" justifyContent="flex-end" mt={1}>
                            <Button
                                variant="outlined"
                                color="secondary"
                                onClick={onBiographyCancel}
                            >
                                Cancel
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                className={classes.saveButton}
                                disabled={disabled}
                                onClick={onBiographySave}
                            >
                                {!isUpdating ? 'Save' : <CircularProgress size={24} />}
                            </Button>
                        </Box>
                    </div>
                )}
            </>
        </div>
    );
};
