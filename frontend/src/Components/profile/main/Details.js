import React, { useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { accountService } from '../../../services/account.service';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Button, Typography } from '@material-ui/core';
import { CustomRating } from '../../common/Rating';
import { Biography } from './Biography';
import { Interests } from './Interests';
import { AdditionalInfo } from './AdditionalInfo';
import { capitalize } from '../../../functions/capitalize';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import BlockIcon from '@material-ui/icons/Block';
import { AvatarWithOnlineBadge } from '../../common/AvatarWithOnlineBadge';

const useStyles = makeStyles(theme => ({
    header: {
        border: '2px solid #3f51b5',
        marginBottom: '2rem',
        borderRadius: '10px',
    },
    mainInfo: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        padding: '1rem 1rem 2rem',
    },
    userInfo: {
        display: 'flex',
        flexDirection: 'column',
        marginLeft: '2rem',
    },
    username: {
        marginBottom: '1rem',
    },
    likeButton: {
        marginRight: '0.5rem',
    },
}));

export const Details = () => {
    const user = accountService.userValue;
    const classes = useStyles();
    const location = useLocation();
    const { userId } = useParams();
    const [like, setLike] = useState(false);
    const [block, setBlock] = useState(false);

    let type =
        location.pathname === '/profile/me' || location.pathname === `/profile/${user.id}`
            ? 'myProfile'
            : 'otherUser';

    const onRatingChange = rating => {
        accountService.updateRating(userId, rating).then(() => {});
    };

    const onChangeLikeStatus = () => {
        setLike(prevState => !prevState);
        accountService.changeLikeStatus(userId, like).then();
    };

    const onBlockChange = () => {
        setBlock(prevState => !prevState);
        accountService.changeBlockStatus(userId, block).then();
    };

    return (
        <>
            <Box className={classes.header}>
                <Box className={classes.mainInfo}>
                    <Box display="flex" alignItems="center">
                        <AvatarWithOnlineBadge type={type} />
                        <div className={classes.userInfo}>
                            <Typography component="h2" variant="h4" className={classes.username}>
                                {capitalize(user.username)}
                            </Typography>
                            <CustomRating
                                rating={user.rating}
                                onRatingChange={onRatingChange}
                                readOnly={type === 'myProfile'}
                            />
                        </div>
                    </Box>
                    <Box display="flex" alignSelf="flex-end" mb={-2}>
                        <Button
                            variant="outlined"
                            color="secondary"
                            className={classes.likeButton}
                            startIcon={like ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                            onClick={onChangeLikeStatus}
                        >
                            {like ? 'Unlike' : 'Like'}
                        </Button>
                        <Button
                            variant="outlined"
                            color="secondary"
                            startIcon={<BlockIcon />}
                            onClick={onBlockChange}
                        >
                            {block ? 'Unblock' : 'Block'}
                        </Button>
                    </Box>
                </Box>
            </Box>
            <Box display="flex">
                <Box
                    display="flex"
                    flexDirection="column"
                    justifyContent="space-between"
                    flexBasis="70%"
                >
                    <Biography type={type} />
                    <Interests type={type} />
                </Box>
                <AdditionalInfo type={type} />
            </Box>
        </>
    );
};
