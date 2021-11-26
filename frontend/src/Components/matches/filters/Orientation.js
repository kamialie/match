import React, { useContext, useEffect, useState } from 'react';
import { TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { ServiceContext } from '../../../services/serviceContext';

const orientation = [
    { label: 'men interested in man', db: 'gay' },
    { label: 'women interested in woman', db: 'lesbian' },
    { label: 'women interested in man', db: 'straight_woman' },
    { label: 'men interested in woman', db: 'straight_man' },
    { label: 'women interested in woman and man', db: 'bi_woman' },
    { label: 'men interested in woman and man', db: 'bi_man' },
];

const Orientation = () => {
    const [sexOrientation, setSexOrientation] = useState('');

    const filterService = useContext(ServiceContext).filterService;
    useEffect(() => {
        const subscription = filterService.filter.subscribe(f => {
            setSexOrientation(f.sex_orientation);
        });
        return () => subscription.unsubscribe();
    }, []);

    const handleOrientationChange = (event, newValue) => {
        filterService.updateFilter('sex_orientation', newValue || '');
    };

    return (
        <Autocomplete
            id="orientation"
            onChange={handleOrientationChange}
            options={orientation.map(x => x.label)}
            getOptionLabel={option => option}
            value={sexOrientation}
            getOptionSelected={option => option}
            renderInput={params => <TextField {...params} label="I'm looking for ..." />}
        />
    );
};

export default Orientation;
