import React, { useState, useEffect, useContext } from 'react';
import { Badge, Typography, IconButton, Box } from '@material-ui/core';
import { MenuItem, Menu } from '@material-ui/core';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';

import { componentStyles } from '../../styles/component';
import { buttonStyle } from '../../styles/button';
import { systemStyles } from '../../styles/system';
import { ServiceContext } from '../../services/serviceContext';

const ProfileMenu = ({ handleNavigation, active, setActive }) => {
    const [notifications, setNotifications] = useState({});

    const context = useContext(ServiceContext);
    const notificationsService = context.notificationService;
    const socket = context.socket;

    useEffect(() => {
        const subscription = notificationsService.notification.subscribe(n => {
            setNotifications(n);
        });
        return () => subscription.unsubscribe();
    }, []);

    const [profileSettings, setProfileSettings] = useState(null);
    const classes = componentStyles();
    const classesBtn = buttonStyle();
    const classesSystem = systemStyles();

    useEffect(() => {
        socket.on('UPDATE_NOTIFICATIONS', type => {
            notificationsService.getNotifications();
        });
    }, [socket, notificationsService]);

    const amount = number => (number > 99 ? '99+' : number);

    const clickMenu = menuItem => {
        setActive('Profile');
        handleNavigation(menuItem.pageUrl);
        setProfileSettings(null);
    };

    const profileMenu = [
        {
            title: 'My profile',
            pageUrl: '/profile/me',
        },
        {
            title: 'Account Settings',
            pageUrl: '/profile/settings',
        },
        {
            title: 'Visit history',
            pageUrl: '/visits/allVisits',
            notification: notifications.visit ? amount(notifications.visit) : '',
            color: notifications.visit > 0 ? 'primary.main' : 'transparent',
        },
    ];

    return (
        <>
            <IconButton
                className={
                    active === 'profile' || active === 'settings' || active === 'visits'
                        ? classesBtn.iconButtonActive
                        : classesBtn.iconButton
                }
                onClick={event => setProfileSettings(event.currentTarget)}
            >
                <Typography
                    variant="button"
                    className={classesSystem.mobileText}
                    color="textSecondary"
                >
                    <Badge badgeContent={notifications?.visit} max={99} color="primary">
                        <PersonOutlineIcon />
                    </Badge>
                    Profile
                </Typography>
            </IconButton>
            <Menu
                className={classes.menu}
                keepMounted
                getContentAnchorEl={null}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                elevation={0}
                anchorEl={profileSettings}
                open={Boolean(profileSettings)}
                onClose={() => setProfileSettings(null)}
            >
                {profileMenu.map(menuItem => (
                    <MenuItem
                        className={classes.menuItem}
                        key={menuItem.title}
                        onClick={() => clickMenu(menuItem)}
                    >
                        {menuItem.title}
                        <Box
                            ml={2}
                            borderRadius="50%"
                            width="20px"
                            height="20px"
                            textAlign="center"
                            bgcolor={menuItem.color}
                        >
                            {menuItem.notification}
                        </Box>
                    </MenuItem>
                ))}
            </Menu>
        </>
    );
};

export default ProfileMenu;
