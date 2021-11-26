import React, { useState } from 'react';
import { Avatar, Badge, Tooltip } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';

const StyledBadge = withStyles(theme => ({
    badge: {
        backgroundColor: '#44b700',
        color: '#44b700',
        marginBottom: '-1rem',
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        '&::after': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            animation: '$ripple 1.2s infinite ease-in-out',
            border: '1px solid currentColor',
            content: '""',
        },
    },
    '@keyframes ripple': {
        '0%': {
            transform: 'scale(.8)',
            opacity: 1,
        },
        '100%': {
            transform: 'scale(2.4)',
            opacity: 0,
        },
    },
}))(Badge);

const StyledOfflineBadge = withStyles(theme => ({
    badge: {
        backgroundColor: 'black',
        color: 'black',
        marginBottom: '-1rem',
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        '&::after': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            border: '1px solid grey',
            content: '""',
        },
    },
}))(Badge);

const useStyles = makeStyles(theme => ({
    avatar: {
        alignItems: 'center',
        margin: 'auto',
        width: '160px',
        height: '160px',
        display: 'flex',
        marginBottom: '-1rem',
    },
}));

export const AvatarWithOnlineBadge = ({ type }) => {
    const [partnerIsOnline, setPartnerIsOnline] = useState(true);
    const date = new Date().toLocaleString();
    const classes = useStyles();

    const currentAvatar = '../../../images/badmin.jpg';

    return (
        <>
            {partnerIsOnline ? (
                <StyledBadge
                    overlap="circle"
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                    variant="dot"
                >
                    <Avatar
                        className={classes.avatar}
                        // onClick={handleClickOpen}
                        alt="user profile"
                        src={currentAvatar}
                    />
                </StyledBadge>
            ) : (
                <Tooltip title={`Last seen ${date}`} placement="bottom">
                    <StyledOfflineBadge
                        overlap="circle"
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                        variant="dot"
                    >
                        <Avatar
                            className={classes.avatar}
                            // onClick={handleClickOpen}
                            alt="user profile"
                            src={currentAvatar}
                        />
                    </StyledOfflineBadge>
                </Tooltip>
            )}
        </>
    );
};
