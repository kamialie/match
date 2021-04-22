import jwt
import datetime

from flask import request, current_app as app, g
from werkzeug.security import check_password_hash
from jwt import ExpiredSignatureError, InvalidTokenError
from matcha.repository import UserRepository
from matcha.exceptions.user import UserNameNotFoundError, WrongPasswordError, UserAttributeError
from matcha.exceptions.auth import UserIdMissingTokenError


def verify_password(password_hash, password):
    return check_password_hash(password_hash, password)

def verify_token():
    token = request.json.get('token')
    if token is None:
        return {'error': 'missing token attribute'}, 400
    try:
        data = jwt.decode(token, app.config['SECRET_KEY'], algorithms=["HS256"])
    except ExpiredSignatureError as e:
        app.logger.warning(e)
        return {'error': str(e)}, 400
    except InvalidTokenError as e:
        app.logger.warning(e)
        return {'error': str(e)}, 400

    try:
        g.user_id = data['user_id']
    except UserIdMissingTokenError as e:
        app.logger.warning(e)
        return {'error': str(e)}, 400

def get_auth_token(user_id):
    encoded_jwt = jwt.encode(
        {
            "user_id": user_id,
            "exp": datetime.datetime.utcnow() + datetime.timedelta(seconds=30)
        },
        app.config['SECRET_KEY'], algorithm="HS256"
    )
    return encoded_jwt

class AuthHandler:
    def __init__(self):
        self._userRepository = UserRepository()

    def login(self, request_body):
        """Find user and match password"""
        try:
            username = request_body['username']
            password = request_body['password']
        except KeyError:
            raise UserAttributeError('username', 'password')

        user = self._userRepository.get_user_by_name(username)

        if user is None:
            raise UserNameNotFoundError(username)
        if not verify_password(user.password, password):
            raise WrongPasswordError(username)
        # TODO switch to 3.9 for more elegant dict merge
        return {**user.as_dict(), **{'token': get_auth_token(user.id)}}

    def logout(self):
        pass
