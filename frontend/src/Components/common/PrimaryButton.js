import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { CircularProgress } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export const PrimaryButton = ({ children, isLoading, ...props }) => {
    const styles = useStyles();

    return (
        <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={styles.root}
            {...props}
        >
            {!isLoading ? children : <CircularProgress size={24} />}
        </Button>
    );
};
