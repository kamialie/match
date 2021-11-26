import React, { useContext, useEffect, useState } from 'react';
import UserCard from './UserCard';
import { Grid } from '@material-ui/core';
import { systemStyles } from '../../styles/system';
import { ServiceContext } from '../../services/serviceContext';

const Gallery = () => {
    const [match, setMatch] = useState([]);
    const [iEnd, setIEnd] = useState(0);

    const matchService = useContext(ServiceContext).matchService;

    useEffect(() => {
        const subscription = matchService.match.subscribe(m => {
            setMatch(m.match);
            setIEnd(m.iEnd);
        });
        return () => subscription.unsubscribe();
    }, []);

    const classes = systemStyles();

    return (
        <Grid container spacing={3} className={classes.pt50}>
            {match.length > 0 &&
                match
                    .filter((elem, i) => i >= 0 && i < iEnd)
                    .map(mat => {
                        return <UserCard key={mat.id} card={mat} />;
                    })}
        </Grid>
    );
};

export default Gallery;
