import { makeStyles } from '@material-ui/core/styles';

export const componentStyles = makeStyles(
    theme => ({
        header: {
            height: '150px',
            backgroundSize: 'cover',
        },
        tabs: {
            padding: 0,
            [theme.breakpoints.down('xs')]: { minHeight: '53px' },
            '& .MuiTab-wrapper': { flexDirection: 'row', justifyContent: 'start' },
            '& .MuiTab-root': { padding: 0 },
        },
        list: { maxHeight: 350, overflow: 'auto', borderTop: '1px solid #252839' },
        notFound: {
            height: '90vh',
            alignItems: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '-60px',
        },
        menuItem: {
            color: '#fff',
            '&:hover': {
                backgroundColor: theme.palette.primary.main,
                '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
                    color: theme.palette.common.white,
                },
            },
            '& .MuiListItemIcon-root': { color: theme.palette.common.white },
        },
        menu: {
            '& .MuiMenu-paper': {
                border: '1px solid #000',
                background: theme.palette.secondary.main,
            },
        },
        avatarImageStyle: {
            alignItems: 'center',
            margin: 'auto',
            width: '160px',
            height: '160px',
            display: 'flex',
            marginBottom: '-20px',
        },
        gridList: {
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-around',
            overflow: 'hidden',
            backgroundColor: theme.palette.background.paper,
        },
        editBox: { minWidth: '300px', [theme.breakpoints.down('sm')]: { minWidth: '220px' } },
        progress: { width: '75%', margin: 'auto', padding: '5px' },
        background: {
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
        },
        spinner: { width: '200px', margin: 'auto', display: 'block', marginTop: '100px' },
        circle: {
            overflow: 'hidden',
            [theme.breakpoints.up('sm')]: { maxWidth: '50%' },
            alignItems: 'center',
        },
        input: {
            margin: '5px',
            maxWidth: '300px',
            minWidth: '300px',
            '& label': { color: theme.palette.secondary.main, fontSize: '20px' },
            '& input': { textAlign: 'center' },
            '& .MuiOutlinedInput-root': {
                borderColor: 'grey',
                borderRadius: '30px',
                backgroundColor: '#fff',
                color: theme.palette.secondary.main,
                width: '100%',
                fontSize: '20px',
                borderWidth: 2,
            },
            [theme.breakpoints.down('xs')]: { maxWidth: '250px', minWidth: '250px' },
        },
        input2: {
            maxWidth: '300px',
            minWidth: '300px',
            margin: '10px',
            alignItems: 'center',
            '& label': { color: theme.palette.primary.light, fontSize: '16px' },
            '& input': { textAlign: 'center' },
            '& .MuiOutlinedInput-root': { borderRadius: '30px', width: '100%', fontSize: '16px' },
            '& .MuiOutlinedInput-notchedOutline': {
                border: '1px solid ' + theme.palette.primary.light,
            },
            [theme.breakpoints.down('xs')]: { maxWidth: '250px', minWidth: '250px' },
        },
        bioInput: {
            color: theme.palette.text.primary,
            background: 'transparent',
            border: '1px solid ' + theme.palette.primary.main,
            minWidth: '400px',
            [theme.breakpoints.down('xs')]: { minWidth: '200px' },
        },
        radio: {
            margin: '10px 0',
            maxWidth: '300px',
            borderRadius: '30px !important',
            [theme.breakpoints.down('xs')]: { maxWidth: '250px', minWidth: '250px' },
        },
        chatInput: {
            width: '100%',
            border: '1px solid ' + theme.palette.primary.main,
            borderRadius: '14px 14px 14px 14px',
            '& .MuiOutlinedInput-root': {
                '& :focus': {
                    borderRadius: '14px 14px 14px 14px',
                    background: theme.palette.background.default,
                    border: '1px solid ' + theme.palette.primary.main,
                },
            },
            '& .MuiInputBase-root': {
                borderRadius: '14px 14px 14px 14px',
                '& :focus': {
                    borderRadius: '14px 14px 14px 14px',
                    background: 'yellow',
                    border: '1px solid ' + theme.palette.primary.main,
                },
            },
        },
        snackbar: {
            width: '100%',
            '& > * + *': {
                marginTop: theme.spacing(2),
            },
        },
        minHeight: {
            minHeight: '80vh',
        },
        sizeBox: {
            maxWidth: '400px',
            minWidth: '400px',
            margin: 'auto',
            [theme.breakpoints.down('xs')]: { maxWidth: '250px', minWidth: '250px' },
        },
    }),
    { index: 1 }
);
