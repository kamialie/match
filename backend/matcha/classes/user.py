from flask import current_app as app
from werkzeug.security import check_password_hash
from enum import Enum, unique

from backend.matcha.db_methods import get_user

@unique
class Login(Enum):
    SUCCESS = 0
    INCORRECT_USER = 1
    INCORRECT_PASS = 2

class User:
    def __init__(self, login, password):
        self.first_name = 'kek'


    @staticmethod
    def login(data):
        user_name = data['user_name']
        password = data['password']

        app.logger.info(f'username - {user_name}')
        app.logger.info(f'password - {password}')

        user = get_user(user_name)

        if user is None:
            return Login.INCORRECT_USER
        elif not check_password_hash(user['password'], password):
            return Login.INCORRECT_PASS

        return Login.SUCCESS


    def register(self, data):
        user_name = data['user_name']
        password = data['password']
        email = data['email']
        last_name = data['last_name']
        first_name = data['first_name']

        app.logger.info(f'user_name - {user_name}')
        app.logger.info(f'password - {password}')
        app.logger.info(f'first_name - {first_name}')
        app.logger.info(f'last_name - {last_name}')
        app.logger.info(f'email - {email}')

        if not user_name:
            return {'message': 'user_name is required'}, 400
        elif not password:
            return {'message': 'password is required'}, 400

