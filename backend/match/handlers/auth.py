import jwt
import datetime

from flask import request, current_app as app, g
from werkzeug.security import check_password_hash
from match.repository import UserRepository
from match.exceptions.user import UserNameNotFoundError, WrongPasswordError
from match.exceptions.auth import UserIdMissingTokenError

def verify_password(password_hash, password):
    return check_password_hash(password_hash, password)

def verify_token():
    authorization = request.headers.get('Authorization')
    if authorization is None:
        return {'error': 'Missing Authorization header'}, 400
    try:
        auth_type, token = authorization.split()
    except ValueError:
        return {'error': 'Invalid Authorization header value'}, 400

    if auth_type != 'Bearer':
        return {'error': 'Incorrect Authorization header type'}, 400

    try:
        decode_token(token)
    except jwt.InvalidTokenError as e:
        msg = f'Invalid token - {e}'
        app.logger.warning(msg)
        return {'error': msg}, 400

#TODO test with app.secret_key
def decode_token(token):
    data = jwt.decode(token, app.config['SECRET_KEY'], algorithms=["HS256"])
    g.user_id = data.get('user_id')
    if g.user_id is None:
        raise UserIdMissingTokenError

def create_token(user_id, minutes=10):
    encoded_jwt = jwt.encode(
        {
            "user_id": user_id,
            "exp": datetime.datetime.utcnow() + datetime.timedelta(minutes=minutes)
        },
        app.config['SECRET_KEY'], algorithm="HS256"
    )
    return encoded_jwt

class AuthHandler:
    def __init__(self):
        self._userRepository = UserRepository()

    def login(self, username, password):
        """Find user and match password"""

        user = self._userRepository.get_user_by_name(username)
        if user is None:
            raise UserNameNotFoundError(username)
        if not verify_password(user.password, password):
            raise WrongPasswordError(username)
        # TODO switch to 3.9 for more elegant dict merge
        return {**user.as_dict(), **{'token': create_token(user.id)}}

    def logout(self):
        pass
