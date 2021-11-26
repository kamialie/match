import React, { useContext, useEffect, useState } from 'react';
import { Badge, Typography, IconButton } from '@material-ui/core';
import { MessageOutlined, PeopleOutline, FavoriteBorder } from '@material-ui/icons';

import { accountService } from '../../services/account.service';

import { buttonStyle } from '../../styles/button';
import { systemStyles } from '../../styles/system';
import { ServiceContext } from '../../services/serviceContext';

const NavItem = ({ handleNavigation, active, setActive }) => {
    const user = accountService.userValue;

    const context = useContext(ServiceContext);
    const notificationsService = context.notificationService;
    const socket = context.socket;

    const [notifications, setNotifications] = useState({});

    useEffect(() => {
        const subscription = notificationsService.notification.subscribe(n => {
            setNotifications(n);
        });
        return () => subscription.unsubscribe();
    }, []);

    const classes = buttonStyle();
    const classesSystem = systemStyles();

    useEffect(() => {
        if (user && user.status === 2) {
            socket.emit('LOGIN', user.id);
            notificationsService.getNotifications();
            socket.on('READ_MESSAGES', async senderId => {
                // await dispatch(updateNotifications('message', senderId));
                notificationsService.getNotifications();
            });
            socket.on('UPDATE_NOTIFICATIONS', type => {
                notificationsService.getNotifications();
            });
            return () => {
                socket.emit('LOGOUT', user.id);
            };
        }
    }, [user, socket, notificationsService]);

    const menuItems = [
        {
            title: 'Matches',
            pageUrl: '/matches',
            icon: <PeopleOutline />,
            active: active === 'matches',
        },
        {
            title: 'Messages',
            pageUrl: '/messages',
            amount: Number(notifications.message || 0),
            icon: <MessageOutlined />,
            color: 'primary',
            active: active === 'messages',
        },
        {
            title: 'Likes',
            pageUrl: '/likes',
            amount:
                Number(notifications.like || 0) +
                Number(notifications.unlike || 0) +
                Number(notifications.match || 0),
            icon: <FavoriteBorder />,
            color: 'primary',
            active: active === 'likes',
        },
    ];

    const handleClick = (url, title) => {
        setActive(title);
        handleNavigation(url);
    };

    return (
        <>
            {user &&
                user.status === 2 &&
                menuItems.map(menu => (
                    <IconButton
                        key={menu.title}
                        className={menu.active ? classes.iconButtonActive : classes.iconButton}
                        onClick={() => handleClick(menu.pageUrl, menu.title)}
                    >
                        <Typography
                            color="textSecondary"
                            className={classesSystem.mobileText}
                            variant="button"
                        >
                            <Badge
                                badgeContent={menu.amount}
                                className={classesSystem.pr5}
                                max={99}
                                color={menu.color}
                            >
                                {menu.icon}
                            </Badge>{' '}
                            {menu.title}
                        </Typography>
                    </IconButton>
                ))}
        </>
    );
};

export default NavItem;
