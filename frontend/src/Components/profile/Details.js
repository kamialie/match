import React from 'react';

import { Link } from 'react-router-dom';

import { accountService } from '../../services/account.service';
import Dropzone from '../dropzone/Dropzone';
import MyMap from '../mymap/MyMap';
import Avatar from './avatar/Avatar';

function Details({ match }) {
    const { path } = match;
    const user = accountService.userValue;

    const getUserName = () => {
        return 'Камиль Алиевич';
    };

    return (
        <div className="profile-container">
            <h1 className="profile-title">My Profile</h1>
            <div className="profile">
                <Avatar />
                <div className="profile-main-info">
                    <p>User full name: {getUserName()}</p>
                    <p>Username: {'Rgyles'}</p>
                    <p>Email: {user.email}</p>
                </div>
            </div>
            <Link to={`${path}/update`}>Update profile</Link>
            <MyMap />
            <Dropzone />
        </div>
    );
}

export { Details };
