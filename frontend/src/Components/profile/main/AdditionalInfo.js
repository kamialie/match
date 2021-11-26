import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { accountService } from '../../../services/account.service';
import { Box, Divider, Grid, IconButton, Tooltip, Typography } from '@material-ui/core';
import WcIcon from '@material-ui/icons/Wc';
import FaceIcon from '@material-ui/icons/Face';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import CakeIcon from '@material-ui/icons/Cake';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import { capitalize } from '../../../functions/capitalize';
import { dateFormat } from '../../../functions/date-format';
import EditIcon from '@material-ui/icons/Edit';
import { EditInfoDialog } from './EditInfoDialog';

const useStyles = makeStyles(theme => ({
    root: {
        flexBasis: '30%',
        marginLeft: '3rem',
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
    text: {
        marginLeft: '1rem',
        fontSize: '16px',
    },
}));

export const AdditionalInfo = ({ type }) => {
    const [popupOpen, setPopupOpen] = useState(false);

    const handlePopupOpen = () => {
        setPopupOpen(true);
    };

    const handlePopupClose = () => {
        setPopupOpen(false);
    };

    const user = accountService.userValue;
    const classes = useStyles();

    return (
        <Box display="flex" flexDirection="column" flexBasis="70%" className={classes.root}>
            <div className={classes.header}>
                <Typography component="h2" variant="h6">
                    About me
                </Typography>
                {type === 'myProfile' && (
                    <Tooltip title="Click to edit information" placement="bottom">
                        <IconButton aria-label="edit" onClick={handlePopupOpen}>
                            <EditIcon />
                        </IconButton>
                    </Tooltip>
                )}
            </div>
            <Divider />
            <Grid container direction="column">
                <Grid container direction="row" alignItems="center">
                    <FaceIcon fontSize="large" />
                    <p className={classes.text}>
                        {capitalize(user.firstName) + ' ' + capitalize(user.lastName)}
                    </p>
                </Grid>
                <Grid container direction="row" alignItems="center">
                    <VpnKeyIcon fontSize="large" />
                    <p className={classes.text}>{user.username}</p>
                </Grid>
                <Grid container direction="row" alignItems="center">
                    <CakeIcon fontSize="large" />
                    <p className={classes.text}>{dateFormat(user.birthDate, 'Do MMMM YYYY')}</p>
                </Grid>
                <Grid container direction="row" alignItems="center">
                    <LocationOnIcon fontSize="large" />
                    <p className={classes.text}>{capitalize(user.country)}</p>
                </Grid>
                <Grid container direction="row" alignItems="center">
                    <WcIcon fontSize="large" />
                    <p className={classes.text}>{capitalize(user.sex)}</p>
                </Grid>
                <Grid container direction="row" alignItems="center">
                    <WhatshotIcon fontSize="large" />
                    <p className={classes.text}>{capitalize(user.sexualPreferences)}</p>
                </Grid>
            </Grid>
            <EditInfoDialog open={popupOpen} handleClose={handlePopupClose} />
        </Box>
    );
};
