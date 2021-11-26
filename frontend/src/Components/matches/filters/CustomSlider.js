import React, { useContext, useEffect, useState } from 'react';
import { Slider, Typography } from '@material-ui/core';
import { ServiceContext } from '../../../services/serviceContext';

const CustomSlider = ({ type }) => {
    const [filter, setFilter] = useState({});

    const filterService = useContext(ServiceContext).filterService;

    useEffect(() => {
        const subscription = filterService.filter.subscribe(f => {
            setFilter(f);
        });
        return () => subscription.unsubscribe();
    }, []);

    const handleDistanceChange = (event, newValue) => {
        filterService.updateFilter('min_distance', newValue[0]);
        filterService.updateFilter('max_distance', newValue[1]);
    };

    const handleFameChange = (event, newValue) => {
        filterService.updateFilter('min_fame', newValue[0]);
        filterService.updateFilter('max_fame', newValue[1]);
    };
    const handleAgeChange = (event, newValue) => {
        filterService.updateFilter('min_age', newValue[0]);
        filterService.updateFilter('max_age', newValue[1]);
    };

    const data = {
        distance: {
            title: 'Distance 0 - 20,000 km',
            defaultMin: 0,
            defaultMax: 20000,
            valueMin: filter.min_distance || 0,
            valueMax: filter.max_distance || 20000,
            handleChange: handleDistanceChange,
        },
        fame: {
            title: 'Fame 0 - 5',
            defaultMin: 0,
            defaultMax: 5,
            valueMin: filter.min_fame || 0,
            valueMax: filter.max_fame || 5,
            handleChange: handleFameChange,
        },
        age: {
            title: 'Age 18 - 99',
            defaultMin: 18,
            defaultMax: 99,
            valueMin: filter.min_age || 18,
            valueMax: filter.max_age || 99,
            handleChange: handleAgeChange,
        },
    };

    return (
        <>
            <Typography id="range-slider" variant="body1" color="textSecondary" gutterBottom>
                {data[type].title}
            </Typography>
            <Slider
                min={data[type].defaultMin}
                max={data[type].defaultMax}
                value={[data[type].valueMin, data[type].valueMax]}
                onChange={data[type].handleChange}
                valueLabelDisplay="auto"
                aria-labelledby="range-slider"
                getAriaValueText={value => value || ''}
            />
        </>
    );
};

export default CustomSlider;
