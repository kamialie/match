import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { ExitToAppOutlined } from '@material-ui/icons';
import { Badge, AppBar, Toolbar, Typography, Box, IconButton } from '@material-ui/core';

import { buttonStyle } from '../../styles/button';
import { systemStyles } from '../../styles/system';

import ProfileMenu from './ProfileMenu';
import NavItem from './NavItem';
import { accountService } from '../../services/account.service';

const Navbar = () => {
    const user = accountService.userValue;

    const history = useHistory();
    const location = useLocation();
    const [active, setActive] = useState('Matches');
    const classes = buttonStyle();
    const classesSystem = systemStyles();

    useEffect(() => {
        setActive(location.pathname.split('/')[1]);
    }, [location]);

    const handleNavigation = newRoute => {
        history.push(newRoute);
    };

    return (
        <AppBar color="secondary" className={user ? classesSystem.bottomXS : ''}>
            <Toolbar>
                <Box justifyContent="flex-start" display="flex" flexGrow={2}>
                    <IconButton
                        className={`${classes.iconButton} ${classesSystem.hideMedium}`}
                        onClick={() => {
                            setActive('Matches');
                            handleNavigation('/matches');
                        }}
                    >
                        <Typography color="textPrimary" variant="h6">
                            Matcha
                        </Typography>
                    </IconButton>
                    <NavItem
                        active={active}
                        setActive={setActive}
                        handleNavigation={handleNavigation}
                    />
                </Box>
                {user && (
                    <Box display="flex">
                        {user.status === 2 && (
                            <ProfileMenu
                                active={active}
                                setActive={setActive}
                                handleNavigation={handleNavigation}
                            />
                        )}
                        <IconButton
                            className={classes.iconButton}
                            onClick={() => accountService.logout()}
                        >
                            <Typography
                                variant="button"
                                className={classesSystem.mobileText}
                                color="textSecondary"
                            >
                                <Badge>
                                    <ExitToAppOutlined />
                                </Badge>
                                Logout
                            </Typography>
                        </IconButton>
                    </Box>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
