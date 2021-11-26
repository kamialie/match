import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { IconButton } from '@material-ui/core';
import { FavoriteBorderRounded } from '@material-ui/icons';
import { ChatBubbleOutlineRounded } from '@material-ui/icons';

import { galleryStyles } from '../../styles/gallery';
import { ServiceContext } from '../../services/serviceContext';
import { alertService } from '../../services/alert.service';

const LikeButton = ({ card }) => {
    const [match, setMatch] = useState([]);

    const context = useContext(ServiceContext);

    const matchService = context.matchService;
    const socket = context.socket;

    useEffect(() => {
        const subscription = matchService.match.subscribe(m => {
            setMatch(m.match);
        });
        return () => subscription.unsubscribe();
    }, []);

    // const auth = useSelector(state => state.auth);
    // const profile = useSelector(state => state.profile);

    const classesGallery = galleryStyles();
    const handleLike = () => {
        if (false) {
            let toUserId = card.id;
            if (card.connected === 0 || card.connected === 3) {
                if (card.connected === 3) {
                    socket.emit('UPDATE_NOTIFICATIONS', toUserId, 'match');
                } else {
                    socket.emit('UPDATE_NOTIFICATIONS', toUserId, 'like');
                }
                // dispatch(addLike('userCard', toUserId, match.match, profile.profile));
            } else {
                if (card.connected === 2) {
                    socket.emit('UPDATE_NOTIFICATIONS', toUserId, 'unlike');
                }
                // dispatch(removeLike('userCard', toUserId, match.match, profile.profile));
            }
        } else {
            alertService.warn('Add profile photo to enable like functionality');
        }
    };

    return (
        <>
            <IconButton aria-label="like" onClick={handleLike} className={classesGallery.icon}>
                <FavoriteBorderRounded
                    className={
                        card.connected > 0 && card.connected < 3
                            ? classesGallery.fullLikeBtn
                            : classesGallery.emptyLikeBtn
                    }
                />
            </IconButton>
            {card.connected === 2 ? (
                <IconButton
                    className={classesGallery.icon}
                    aria-label="chat"
                    component={Link}
                    to={`/messages/${card.id}`}
                >
                    <ChatBubbleOutlineRounded className={classesGallery.emptyLikeBtn} />
                </IconButton>
            ) : (
                ''
            )}
        </>
    );
};

export default LikeButton;
