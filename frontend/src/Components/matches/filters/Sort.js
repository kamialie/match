import React, { useContext, useEffect, useState } from 'react';
import { TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';

import { filterStyles } from '../../../styles/filter';
import { ServiceContext } from '../../../services/serviceContext';

const sort = [
    { label: 'Yongest First', db: 'age_asc' },
    { label: 'Oldest first', db: 'age_desc' },
    { label: 'Best rating', db: 'fame_desc' },
    { label: 'Lowest rating', db: 'fame_asc' },
    { label: 'Closest', db: 'distance_asc' },
    { label: 'Furtherst away', db: 'distance_desc' },
    { label: 'Most common interest', db: 'commonTag_desc' },
    { label: 'Least common interest', db: 'commonTag_asc' },
];

const getValue = (input, array) => {
    const initial = input ? array.find(n => n.db === input) : '';
    return {
        label: input ? initial.label : '',
        db: input ? input : '',
    };
};

const Sort = ({ setFilter, filterIsOn }) => {
    const classesFilter = filterStyles();

    const [order, setOrder] = useState([]);

    const filterService = useContext(ServiceContext).filterService;
    useEffect(() => {
        const subscription = filterService.filter.subscribe(f => {
            setOrder(f.order);
        });
        return () => subscription.unsubscribe();
    }, []);

    const handleSortChange = (event, newValue) => {
        let value = [];
        if (newValue !== null) {
            value[0] = newValue.db;
        }

        filterService.updateFilter('order', value);
        setFilter(filterIsOn + 1);
    };

    return (
        <Autocomplete
            id="combo-sort"
            onChange={handleSortChange}
            options={sort}
            getOptionLabel={option => option.label}
            value={getValue(order[0], sort)}
            getOptionSelected={option => option}
            className={classesFilter.sort}
            renderInput={params => <TextField {...params} label="Sort" />}
        />
    );
};

export default Sort;
