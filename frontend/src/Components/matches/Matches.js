import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { AppBar, Tabs, Tab, Container, Box, Typography } from '@material-ui/core';
import { Search, Whatshot, Favorite, PersonPin } from '@material-ui/icons';
import { Help, QueryBuilder, WbIncandescent } from '@material-ui/icons';

import { systemStyles } from '../../styles/system';
import Filter from './filters';
import GetMatches from '../common/GetMatches';
import { accountService } from '../../services/account.service';
import { CreateAccount } from '../account/create/CreateAccount';
import { ServiceContext } from '../../services/serviceContext';
import TabPanel from './TabPanel';

function a11yProps(index) {
    return {
        id: `scrollable-force-tab-${index}`,
        'aria-controls': `scrollable-force-tabpanel-${index}`,
    };
}

const Matches = () => {
    // const { previousPath } = useSelector((state) => state.auth);

    const user = accountService.userValue;

    const filterService = useContext(ServiceContext).filterService;

    let { page } = useParams();
    const history = useHistory();
    const route = '/api/match/' + page;
    const indexToTabName = [
        'recommend',
        'search',
        'online',
        'new',
        'popular',
        'random',
        'nearby',
        'hidden',
    ];
    const classes = systemStyles();

    if (!indexToTabName.includes(page)) {
        page = 'hidden';
    }

    const [value, setValue] = useState(indexToTabName.indexOf(page));

    const handleChange = (event, newValue) => {
        history.push(`/matches/${indexToTabName[newValue]}`);
        setValue(newValue);
        filterService.reset();
    };

    // useEffect(() => {
    //     if (previousPath === '') {
    //         dispatch(resetFilter());
    //     } else if (previousPath === 'otherUser') {
    //         dispatch({ type: 'UPDATE_PATH', payload: '' });
    //     }
    // }, []); // eslint-disable-line

    return (
        <>
            {user.status === 0 && <CreateAccount />}
            {user.status === 2 && (
                <Box>
                    <AppBar color="secondary" className={classes.py20} position="static">
                        <Container>
                            <Tabs
                                value={value}
                                onChange={handleChange}
                                variant="scrollable"
                                scrollButtons="on"
                                indicatorColor="primary"
                                textColor="primary"
                                aria-label="scrollable force tabs example"
                            >
                                <Tab label="Recommended" icon={<Favorite />} {...a11yProps(0)} />
                                <Tab label="Search" icon={<Search />} {...a11yProps(1)} />
                                <Tab label="Online" icon={<QueryBuilder />} {...a11yProps(2)} />
                                <Tab
                                    label="New People"
                                    icon={<WbIncandescent />}
                                    {...a11yProps(3)}
                                />
                                <Tab label="Popular" icon={<Whatshot />} {...a11yProps(4)} />
                                <Tab label="Random" icon={<Help />} {...a11yProps(5)} />
                                <Tab label="Nearby" icon={<PersonPin />} {...a11yProps(6)} />
                                <Tab className={classes.dNone} label="hidden" />
                            </Tabs>
                        </Container>
                    </AppBar>
                    <Container>
                        <TabPanel value={value} index={0}>
                            <Filter route={route} setting={false} />
                        </TabPanel>
                        <TabPanel value={value} index={1}>
                            <Filter route={route} setting={true} />
                        </TabPanel>
                        {value > 1 && value < 7 && (
                            <TabPanel value={value} index={value}>
                                <GetMatches route={route} filterIsOn={1} />
                            </TabPanel>
                        )}
                        {value === 7 && (
                            <Box pt={10} alignItems="center" justifyContent="center">
                                <Typography variant="body2">Page not found</Typography>
                            </Box>
                        )}
                    </Container>
                </Box>
            )}
        </>
    );
};
export default Matches;
