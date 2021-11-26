import React, { useRef, useEffect, useState } from 'react';
import { Box, Button, Tooltip } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginRight: '2rem',
    },
    avatar: {
        objectFit: 'cover',
        width: '200px',
        height: '200px',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        borderRadius: '50%',

        '&:before': {
            content: '""',
            display: 'none',
            width: '200px',
            height: '200px',
            borderRadius: '50%',
            backgroundColor: 'rgba(0, 0, 0, .5)',
        },

        '&:hover&:before': {
            display: 'block',
        },
    },
    avatarButtons: {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: '20px',
    },
    avatarFileInput: {
        display: 'none',
    },
    button: {
        margin: theme.spacing(1),
    },
}));

export const Avatar = ({ type }) => {
    const fileInputRef = useRef();
    const modalImageRef = useRef();

    const classes = useStyles();

    const currentAvatar = '../../../images/badmin.jpg';
    const [selectFile, setSelectedFile] = useState(null);

    useEffect(() => {
        modalImageRef.current.style.backgroundImage = `url(${currentAvatar})`;
    }, []);

    const fileInputClicked = () => {
        fileInputRef.current.click();
    };

    const fileSelected = () => {
        setSelectedFile(fileInputRef.current.files[0]);

        const reader = new FileReader();
        reader.readAsDataURL(fileInputRef.current.files[0]);

        reader.onload = e => {
            modalImageRef.current.style.backgroundImage = `url(${e.target.result})`;
        };
    };

    const update = () => {
        console.log(selectFile);
    };

    const cancel = () => {
        setSelectedFile(null);
        modalImageRef.current.style.backgroundImage = `url(${currentAvatar})`;
    };

    const onInputClick = event => {
        event.target.value = null;
    };

    return (
        <Box className={classes.root}>
            <Tooltip title={type === 'myProfile' ? 'Click to change avatar' : ''} placement="left">
                <div className={classes.avatar} ref={modalImageRef} onClick={fileInputClicked} />
            </Tooltip>
            <input
                accept="image/*"
                type="file"
                className={classes.avatarFileInput}
                ref={fileInputRef}
                onChange={fileSelected}
                onClick={onInputClick}
                disabled={type !== 'myProfile'}
            />
            {!!selectFile && (
                <div className={classes.avatarButtons}>
                    <Button
                        variant="contained"
                        color="default"
                        startIcon={<CloudUploadIcon />}
                        className={classes.button}
                        onClick={() => update()}
                    >
                        Update avatar
                    </Button>
                    <Button
                        variant="contained"
                        color="secondary"
                        className={classes.button}
                        onClick={() => cancel()}
                    >
                        Cancel update
                    </Button>
                </div>
            )}
        </Box>
    );
};
