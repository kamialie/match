import React, { useState, useEffect } from 'react';
import { FormGroup, Typography, List } from '@material-ui/core';

//import profileService from '../../../services/profileService';
import { componentStyles } from '../../../styles/component';
import BlockedUserCard from './BlockedUserCard';
import { PrimaryButton } from '../../common/PrimaryButton';
import { Form } from '../../common/Form';

const BlockedUsers = () => {
    const classesSetting = componentStyles();
    const [blockedList, setBlockedUsers] = useState([]);

    const [isLoading, setLoading] = useState(false);

    // useEffect(() => {
    //     profileService.getBlockedUsers().then(res => {
    //         setBlockedUsers(res);
    //     });
    // }, []);

    const handleBlock = index => () => {
        const newBlockedList = [...blockedList];
        newBlockedList[index].blocked = !newBlockedList[index].blocked;
        setBlockedUsers(newBlockedList);
    };

    const handleSave = () => {
        const unblockList = blockedList.filter(e => e.blocked === false);
        // if (unblockList.length > 0) {
        //     dispatch(unblockUser('settings', unblockList));
        //     const newblockedList = blockedList.filter(e => e.blocked === true);
        //     setBlockedUsers(newblockedList);
        // } else {
        //     setSnackbar(true, 'warning', 'No changes applied');
        // }
    };

    if (blockedList.length === 0) {
        return <Typography>No blocked accounts in this profile</Typography>;
    }

    return (
        <FormGroup>
            <List className={classesSetting.list}>
                {blockedList.map((value, index) => {
                    const labelId = `checkbox-list-secondary-label-${value.id}`;

                    return (
                        <BlockedUserCard
                            key={value.id}
                            labelId={labelId}
                            value={value}
                            handleBlock={handleBlock}
                            index={index}
                            blockedList={blockedList}
                        />
                    );
                })}
            </List>
            <PrimaryButton disabled={isLoading} isLoading={isLoading} onClick={handleSave}>
                Submit
            </PrimaryButton>
        </FormGroup>
    );
};

export default BlockedUsers;
