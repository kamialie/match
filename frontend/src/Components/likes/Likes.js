import React, { useState, useEffect, useContext } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { AppBar, Tabs, Tab, Typography, Box, Container, Badge } from '@material-ui/core';

import { systemStyles } from '../../styles/system';
import GetMatches from '../common/GetMatches';
import { ServiceContext } from '../../services/serviceContext';

const Likes = () => {
    const history = useHistory();
    let { page } = useParams();

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

    const classesSystem = systemStyles();

    const indexToTabName = ['likesyou', 'connected', 'hidden'];

    if (!indexToTabName.includes(page)) {
        page = 'hidden';
    }

    const [selectedTab, setValue] = useState(indexToTabName.indexOf(page));
    const [newLikes, setNewLikes] = useState(false);
    const [newUnlikes, setNewUnlikes] = useState(false);
    const [newMatches, setNewMatches] = useState(false);

    const amount = amount => {
        return amount ? (amount < 100 ? amount : '99+') : '';
    };

    useEffect(() => {
        let isMounted = true;
        socket.on('UPDATE_NOTIFICATIONS', type => {
            if (isMounted) {
                if (type === 'unlike') {
                    setNewUnlikes(true);
                }
            }
        });

        if (page === 'connected') {
            setNewUnlikes(false);
            setNewMatches(false);
            notificationsService.updateNotifications('unlike');
        } else if (page === 'likesyou') {
            setNewLikes(false);
            notificationsService.updateNotifications('like');
        }

        notificationsService.getNotifications();

        return () => {
            isMounted = false;
        };
    }, [page, socket, notificationsService]);

    useEffect(() => {
        let isMounted = true;
        socket.on('UPDATE_NOTIFICATIONS', type => {
            if (isMounted && type === 'like') {
                setNewLikes(true);
            }
        });
        notificationsService.updateNotifications('like');
        return () => {
            isMounted = false;
        };
    }, [notificationsService, socket]);

    const handleChange = (event, newValue) => {
        history.push(`/likes/${indexToTabName[newValue]}`);
        setValue(newValue);
    };

    return (
        <div>
            <AppBar color="secondary" position="static">
                <Container>
                    <Box p={2} justifyContent="center">
                        <Typography variant="h6">Likes</Typography>
                        {newLikes && <Typography>You have new likes, refresh the page</Typography>}
                        {newUnlikes && (
                            <Typography>You have new unlikes, refresh the page</Typography>
                        )}
                        {newMatches && (
                            <Typography>You have new connections, refresh the page</Typography>
                        )}
                    </Box>
                    <Tabs
                        value={selectedTab}
                        onChange={handleChange}
                        indicatorColor="primary"
                        textColor="primary"
                    >
                        <Tab
                            label={
                                <Badge badgeContent={amount(notifications.like)} color="primary">
                                    Likes you
                                </Badge>
                            }
                        />
                        <Tab
                            label={
                                <Box>
                                    <Badge
                                        badgeContent={amount(notifications.match)}
                                        color="primary"
                                    >
                                        Connected
                                    </Badge>{' '}
                                    <Badge
                                        badgeContent={-amount(notifications.unlike)}
                                        color="error"
                                    >
                                        {!!notifications.match && (
                                            <Box color="transparent">------</Box>
                                        )}
                                    </Badge>
                                </Box>
                            }
                        />
                        <Tab className={classesSystem.dNone} label="hidden" />
                    </Tabs>
                </Container>
            </AppBar>

            <Container>
                {selectedTab === 0 && (
                    <Box p={3}>
                        <GetMatches route="/api/match/likedme" filterIsOn={0} />
                    </Box>
                )}
                {selectedTab === 1 && (
                    <Box p={3}>
                        <GetMatches route="/api/match/connected" filterIsOn={0} />
                    </Box>
                )}
                {selectedTab === 2 && (
                    <Box pt={5} alignItems="center" justifyContent="center">
                        <Typography variant="body2">Page not found</Typography>
                    </Box>
                )}
            </Container>
        </div>
    );
};

export default Likes;
