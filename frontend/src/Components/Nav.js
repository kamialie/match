import React, { useState, useEffect } from 'react';
import { Link, NavLink, Route } from 'react-router-dom';
import { Role } from '../helpers/role';
import { accountService } from '../services/account.service';
import {
    AppBar,
    Badge,
    Fab,
    IconButton,
    Menu,
    MenuItem,
    MenuList,
    Toolbar,
    Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { ScrollTop } from './common/ScrollTop';

const useStyles = makeStyles(theme => ({
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    menuItems: {
        display: 'flex',
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
}));

export function NavBar() {
    const [user, setUser] = useState({});

    useEffect(() => {
        const subscription = accountService.user.subscribe(x => setUser(x));
        return subscription.unsubscribe;
    }, []);

    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleProfileMenuOpen = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = event => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const logout = () => {
        handleMenuClose();
        accountService.logout();
    };

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={menuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleMenuClose} component={Link} to="./profile">
                Profile
            </MenuItem>
            <MenuItem onClick={logout}>Logout</MenuItem>
        </Menu>
    );

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem>
                <IconButton aria-label="show 11 new notifications" color="inherit">
                    <Badge badgeContent={11} color="secondary">
                        <NotificationsIcon />
                    </Badge>
                </IconButton>
                <p>Notifications</p>
            </MenuItem>
            <MenuItem onClick={handleProfileMenuOpen}>
                <IconButton
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                >
                    <AccountCircle />
                </IconButton>
                <p>Profile</p>
            </MenuItem>
        </Menu>
    );

    // only show nav when logged in
    if (!user) return null;

    return (
        <>
            <AppBar position="static">
                <Toolbar id="back-to-top-anchor">
                    <IconButton
                        edge="start"
                        className={classes.menuButton}
                        color="inherit"
                        aria-label="open drawer"
                    >
                        <MenuIcon />
                    </IconButton>
                    <MenuList className={classes.menuItems}>
                        <MenuItem component={Link} to="./">
                            Matcha
                        </MenuItem>
                        <MenuItem component={Link} to="./">
                            Chat
                        </MenuItem>
                    </MenuList>
                    <div className={classes.grow} />
                    <div className={classes.sectionDesktop}>
                        <IconButton aria-label="show 17 new notifications" color="inherit">
                            <Badge badgeContent={17} color="secondary">
                                <NotificationsIcon />
                            </Badge>
                        </IconButton>
                        <IconButton
                            edge="end"
                            aria-label="account of current user"
                            aria-controls={menuId}
                            aria-haspopup="true"
                            onClick={handleProfileMenuOpen}
                            color="inherit"
                        >
                            <AccountCircle />
                        </IconButton>
                    </div>
                    <div className={classes.sectionMobile}>
                        <IconButton
                            aria-label="show more"
                            aria-controls={mobileMenuId}
                            aria-haspopup="true"
                            onClick={handleMobileMenuOpen}
                            color="inherit"
                        >
                            <MoreIcon />
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
            {renderMobileMenu}
            {renderMenu}
            <ScrollTop>
                <Fab color="secondary" size="small" aria-label="scroll back to top">
                    <KeyboardArrowUpIcon />
                </Fab>
            </ScrollTop>
        </>
    );
}

// function Nav() {
//     const [user, setUser] = useState({});
//
//     useEffect(() => {
//         const subscription = accountService.user.subscribe(x => setUser(x));
//         return subscription.unsubscribe;
//     }, []);
//
//     // only show nav when logged in
//     if (!user) return null;
//
//     return (
//         <div>
//             <nav className="navbar navbar-expand navbar-dark bg-dark">
//                 <div className="navbar-nav">
//                     <NavLink exact to="/" className="nav-item nav-link">
//                         Home
//                     </NavLink>
//                     <NavLink to="/profile" className="nav-item nav-link">
//                         Profile
//                     </NavLink>
//                     {user.role === Role.Admin && (
//                         <NavLink to="/admin" className="nav-item nav-link">
//                             Admin
//                         </NavLink>
//                     )}
//                     <a onClick={accountService.logout} className="nav-item nav-link">
//                         Logout
//                     </a>
//                 </div>
//             </nav>
//             <Route path="/admin" component={AdminNav} />
//         </div>
//     );
// }
//
// function AdminNav({ match }) {
//     const { path } = match;
//
//     return (
//         <nav className="admin-nav navbar navbar-expand navbar-light">
//             <div className="navbar-nav">
//                 <NavLink to={`${path}/users`} className="nav-item nav-link">
//                     Users
//                 </NavLink>
//             </div>
//         </nav>
//     );
// }
//
// export { Nav };
