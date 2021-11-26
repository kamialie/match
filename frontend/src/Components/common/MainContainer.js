import React from 'react';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        flexGrow: 1,
        maxWidth: '500px',
        height: '100%',
    },
}));

export const MainContainer = ({ children, ...props }) => {
    const styles = useStyles();

    return (
        <Container className={styles.root} component="main" {...props}>
            {children}
        </Container>
    );
};
