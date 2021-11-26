import React, { useState, useContext, useEffect } from 'react';
import { TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { ServiceContext } from '../../../services/serviceContext';

const Tags = () => {
    const [realTags, setRealTags] = useState([]);

    const filterService = useContext(ServiceContext).filterService;
    useEffect(() => {
        const subscription = filterService.filter.subscribe(f => {
            setRealTags(f.tags);
        });
        return () => subscription.unsubscribe();
    }, []);

    // useEffect(() => {
    //     let isMounted = true;
    //
    //     async function getTags() {
    //         // const res = await axios.get('/api/profile/tags');
    //         // isMounted && setRealTags(res.data.map(item => item.tag));
    //     }
    //
    //     getTags();
    //     return () => {
    //         isMounted = false;
    //     };
    // }, [filter]);

    const handleInterestChange = (event, newValue) => {
        let selectedTags = [];
        if (newValue.length !== 0) {
            const temp = Object.entries(newValue);
            temp.forEach(([key, value]) => {
                selectedTags.push(value);
            });
        }

        filterService.updateFilter('tags', selectedTags);
    };

    return (
        <Autocomplete
            multiple
            limitTags={2}
            id="interest-standard"
            onChange={handleInterestChange}
            options={realTags}
            getOptionLabel={option => option}
            value={realTags}
            renderInput={params => (
                <TextField {...params} variant="standard" label="Passionate about ..." />
            )}
        />
    );
};

export default Tags;
