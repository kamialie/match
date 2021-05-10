import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { accountService } from '../../services/account.service';
import { Avatar } from './Avatar';
import { MyMap } from '../mymap/MyMap';
import { makeStyles } from '@material-ui/core/styles';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Divider,
    Typography,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { CustomRating } from '../common/Rating';
import { AccordionBiography } from './Accordions/AccordionBiography';

const useStyles = makeStyles(theme => ({
    mainInfo: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '100%',
        marginBottom: '2rem',
    },
    accordion: {
        borderRadius: '10px',

        '&:before': {
            opacity: 0,
        },
    },
    accordionDetails: {
        padding: '1rem',
    },
    userInfo: {
        display: 'flex',
        flexDirection: 'column',
    },
    userName: {
        marginBottom: '1rem',
    },
    biography: {
        width: '100%',
        resize: 'none',
        borderRadius: '10px',
    },
}));

export const Details = ({ match }) => {
    const { path } = match;
    const user = accountService.userValue;
    const classes = useStyles();

    return (
        <div>
            <Box className={classes.mainInfo}>
                <Avatar />
                <div className={classes.userInfo}>
                    <Typography component="h2" variant="h4" className={classes.userName}>
                        {user.username}
                    </Typography>
                    <CustomRating rating={user.rating} />
                </div>
            </Box>

            {/*<Link to={`${path}/update`}>Update profile</Link>*/}
            <>
                <AccordionBiography classes={classes} />
                <Accordion defaultExpanded className={classes.accordion}>
                    <AccordionSummary
                        id="panel2a-header"
                        aria-controls="panel2a-content"
                        expandIcon={<ExpandMoreIcon />}
                    >
                        <Typography component="h2" variant="h6">
                            Accordion 2
                        </Typography>
                    </AccordionSummary>
                    <Divider />
                    <AccordionDetails className={classes.accordionDetails}>
                        <Typography>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                            malesuada lacus ex, sit amet blandit leo lobortis eget.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            </>
            {/*<MyMap />*/}
        </div>
    );
};
