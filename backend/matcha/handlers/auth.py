import jwt
import datetime

from flask import request, current_app as app
from werkzeug.security import check_password_hash, generate_password_hash
from jwt import ExpiredSignatureError, InvalidTokenError
from matcha.classes.user import User
from matcha.exceptions.user import UserNameNotFoundError, WrongPasswordError, UserAlreadyExistsError
from matcha.repository import UserRepository

class AuthHandler:
    def __init__(self):
        self._userRepository = UserRepository()

    def __verify_password(self, password_hash, password):
        return check_password_hash(password_hash, password)

    def __get_hash_password(self, password):
        return generate_password_hash(password)

    @staticmethod
    def get_auth_token(user_id):
        encoded_jwt = jwt.encode(
            {
                "user_id": user_id,
                "exp": datetime.datetime.utcnow() + datetime.timedelta(seconds=30)
            },
            "secret", algorithm="HS256"
        )
        return encoded_jwt

    #TODO check token payload
    @staticmethod
    def verify_token():
        token = request.json.get('token')
        if token is None:
            return {'error': 'missing token attribute'}, 400
        try:
            data = jwt.decode(token, "secret", algorithms=["HS256"])
        except ExpiredSignatureError as e:
            app.logger.warning(e)
            return {'error': str(e)}, 400
        except InvalidTokenError as e:
            app.logger.warning(e)
            return {'error': str(e)}, 400


    def login(self, username, password):
        """Find user and match password"""
        user = self._userRepository.get_by_username(username)

        if user is None:
            raise UserNameNotFoundError(username)
        if not self.__verify_password(user.get_password(), password):
            app.logger.warning(user.get_password())
            raise WrongPasswordError(username)
        return {**user.to_json(), **{'token': AuthHandler.get_auth_token(user.get_user_id())}}

    def register(self, attributes):
        user = self._userRepository.get_by_username(attributes['username'])
        if user is not None:
            raise UserAlreadyExistsError(attributes['username'])

        # TODO probably add method for setting registration attributes
        attributes['password'] = self.__get_hash_password(attributes['password'])
        new_user = User(attributes)
        self._userRepository.create(new_user)

    def logout(self):
        pass
