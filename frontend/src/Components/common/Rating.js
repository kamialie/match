import React from 'react';
import { withStyles } from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import FavoriteIcon from '@material-ui/icons/Favorite';

const StyledRating = withStyles({
    iconFilled: {
        color: '#ff6d75',
    },
    iconHover: {
        color: '#ff3d47',
    },
})(Rating);

export const CustomRating = ({ rating, onRatingChange, readOnly = true }) => {
    return (
        <>
            <p style={{ margin: 0 }}>Rating</p>
            <StyledRating
                name="rating"
                defaultValue={rating}
                precision={0.5}
                icon={<FavoriteIcon fontSize="inherit" />}
                readOnly={readOnly}
                onChange={(event, newValue) => onRatingChange(newValue)}
            />
        </>
    );
};
