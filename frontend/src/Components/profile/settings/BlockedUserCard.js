import React from 'react';
import { Link } from 'react-router-dom';
import ToggleIcon from 'material-ui-toggle-icon';

import { ListItem, ListItemSecondaryAction } from '@material-ui/core';
import { ListItemText, ListItemAvatar, Avatar } from '@material-ui/core';
import { IconButton } from '@material-ui/core';
import { RemoveCircleOutline, CheckCircle } from '@material-ui/icons';

import { systemStyles } from '../../../styles/system';

const BlockedUserCard = ({ value, handleBlock, index, blockedList, labelId }) => {
    const classes = systemStyles();

    return (
        <ListItem
            button
            component={Link}
            to={`/profile/${value.id}`}
            className={classes.borderBottom}
        >
            <ListItemAvatar>
                <Avatar alt="Avatar" src={`../../../../images/badmin.jpg`} />
            </ListItemAvatar>
            <ListItemText id={labelId} primary={`${value.firstName}, ${value.age}`} />
            <ListItemSecondaryAction>
                <IconButton onClick={handleBlock(index)}>
                    <ToggleIcon
                        on={blockedList[index].blocked}
                        onIcon={<RemoveCircleOutline color="primary" />}
                        offIcon={<CheckCircle />}
                    />
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    );
};

export default BlockedUserCard;
