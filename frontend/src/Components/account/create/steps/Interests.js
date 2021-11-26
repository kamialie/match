import React, { useState } from 'react';
import { PrimaryButton } from '../../../common/PrimaryButton';
import { InterestsAutocomplete } from '../../../common/InterestsAutocomplete';

export const Interests = ({ data, onNext }) => {
    const [interests, setInterests] = useState(data.interests || []);

    return (
        <>
            <InterestsAutocomplete interests={interests} onChange={setInterests} />
            <PrimaryButton onClick={() => onNext({ interests })}>Next</PrimaryButton>
        </>
    );
};
