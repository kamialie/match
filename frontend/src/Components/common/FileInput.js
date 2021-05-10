import React, { useCallback, useEffect } from 'react';
import Dropzone from 'react-dropzone';
import { useFormContext } from 'react-hook-form';
import { alertService } from '../../services/alert.service';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import CloudUpload from '@material-ui/icons/CloudUpload';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ClearIcon from '@material-ui/icons/Clear';
import { IconButton } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: '#eee',
        textAlign: 'center',
        cursor: 'pointer',
        color: '#333',
        padding: '10px',
    },
    icon: {
        marginTop: '16px',
        color: '#888888',
        fontSize: '42px',
    },
    listItem: {
        padding: 0,
        justifyContent: 'space-between',
        marginTop: '1rem',
    },
    listItems: {
        width: '100%',
    },
    listItemText: {
        width: '100%',
        overflowWrap: 'anywhere',
    },
    listItemImage: {
        width: '100px',
        marginRight: '10px',
    },
}));

export const FileInput = props => {
    const { name, mode = 'update' } = props;
    const { register, unregister, setValue, watch } = useFormContext();
    const files = watch(name);
    const classes = useStyles();

    const onDrop = useCallback(
        droppedFiles => {
            let newFiles = mode === 'update' ? droppedFiles : [...(files || []), ...droppedFiles];

            if (newFiles.length > 5) {
                alertService.warn('You can choose only 5 images');
                return;
            }

            if (mode === 'append') {
                newFiles = newFiles.reduce((prev, file) => {
                    const fo = Object.entries(file);
                    if (
                        prev.find(e => {
                            const eo = Object.entries(e);
                            return eo.every(
                                ([key, value], index) =>
                                    key === fo[index][0] && value === fo[index][1]
                            );
                        })
                    ) {
                        return prev;
                    } else {
                        return [...prev, file];
                    }
                }, []);
            }

            setValue(name, newFiles, { shouldValidate: true });
        },
        [setValue, name, mode, files]
    );

    const removeFile = fileName => {
        let newFiles = [...files];
        newFiles = newFiles.filter(x => x.name !== fileName);
        setValue(name, newFiles, { shouldValidate: true });
    };

    useEffect(() => {
        register(name);
        return () => {
            unregister(name);
        };
    }, [register, unregister, name]);

    return (
        <>
            <Dropzone accept={props.accept} onDrop={onDrop}>
                {({ getRootProps, getInputProps }) => (
                    <Paper variant="outlined" className={classes.root} {...getRootProps()}>
                        <CloudUpload className={classes.icon} />
                        <input {...getInputProps()} name={name} />
                        <p>Drag 'n' drop files here, or click to select files</p>
                    </Paper>
                )}
            </Dropzone>
            {!!files?.length && (
                <List className={classes.listItems}>
                    {files.map((file, index) => (
                        <ListItem className={classes.listItem} key={index}>
                            <img
                                src={URL.createObjectURL(file)}
                                alt={file.name}
                                className={classes.listItemImage}
                            />
                            <ListItemText
                                className={classes.listItemText}
                                primary={file.name}
                                secondary={file.size}
                            />
                            <IconButton
                                type={'button'}
                                aria-label="delete"
                                onClick={() => removeFile(file.name)}
                            >
                                <ClearIcon color={'secondary'} />
                            </IconButton>
                        </ListItem>
                    ))}
                </List>
            )}
        </>
    );
};
