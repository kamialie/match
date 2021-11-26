import { makeStyles } from '@material-ui/core/styles';

export const profileStyles = makeStyles(
    theme => ({
        backgroundHeader: {
            backgroundSize: 'cover',
        },
        name: {
            color: '#219bf1',
            paddingTop: '2rem',
            textAlign: 'left',
            [theme.breakpoints.down('xs')]: {
                textAlign: 'center',
            },
        },
        description: {
            textAlign: 'left',
            [theme.breakpoints.down('xs')]: {
                textAlign: 'center',
            },
        },
        ratingPosition: {
            textAlign: 'left',
            [theme.breakpoints.down('xs')]: {
                textAlign: 'center',
            },
        },
        ratingFill: {
            '&.MuiRating-root': {
                color: theme.palette.text.primary,
            },
        },
        closeButton: {
            position: 'absolute',
            right: theme.spacing(1),
            top: theme.spacing(1),
            color: theme.palette.grey[500],
        },
        dialog: {
            margin: 0,
            padding: theme.spacing(2),
        },
    }),
    { index: 1 }
);
