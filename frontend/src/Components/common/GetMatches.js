import React, { Fragment, useContext, useEffect, useState } from 'react';
import Typography from '@material-ui/core/Typography';

import Gallery from './Gallery';
// import Spinner from '../../layout/Spinner';
import { systemStyles } from '../../styles/system';
import { ServiceContext } from '../../services/serviceContext';

const GetMatches = ({ route, filterIsOn, reset }) => {
    const [match, setMatch] = useState([]);
    const [isLoading, setLoading] = useState(false);

    const matchService = useContext(ServiceContext).matchService;

    useEffect(() => {
        const subscription = matchService.match.subscribe(m => {
            setMatch(m.match);
        });
        return () => subscription.unsubscribe();
    }, []);

    const classes = systemStyles();

    // useEffect(() => {
    //     dispatch(getRecommend(route, filterIsOn));
    // }, [dispatch, route, filterIsOn, reset]);

    const handleScroll = () => {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 2) {
            // dispatch(fetchMore());
        }
    };
    window.addEventListener('scroll', handleScroll);

    return isLoading ? (
        // <Spinner />
        <p> Loading </p>
    ) : match.length === 0 ? (
        <Typography className={`${classes.alignCenter} ${classes.pt10}`} variant="h6">
            No matches found.
        </Typography>
    ) : (
        <Fragment>
            <Gallery />
        </Fragment>
    );
};

export default GetMatches;
