from werkzeug.security import check_password_hash, generate_password_hash

from matcha.repository import UserRepository
from matcha.classes.user import User

class UserHandlerError(Exception):
    """Base class for UserHandler errors"""
    pass

# TODO add arguments to distingush between login and delete
class UserNameNotFoundError(UserHandlerError):
    def __init__(self, user_name):
        self.user_name = user_name

    def __str__(self):
        return f'user_name {self.user_name} is not found!'


class WrongPasswordError(UserHandlerError):
    def __init__(self, user_name):
        self.user_name = user_name

    def __str__(self):
        return f'{self.user_name} user entered wrong password!'

class UserAlreadyExistsError(UserHandlerError):
    def __init__(self, user_name):
        self.user_name = user_name

    def __str__(self):
        return f'{self.user_name} user already exists!'

class UserHandler:
    """Handler for user related operations"""

    def __init__(self):
        # TODO check if user exists and set a boolean
        self._user = None
        self._userRepository = UserRepository()

    def get_info(self, user_name):
        """ Return user info json"""
        user = self._userRepository.get_by_user_name(user_name)

        if user is None:
            raise UserNameNotFoundError(user_name)
        return user.to_json()

    def login(self, user_name, password):
        """Find user and match password"""
        user = self._userRepository.get_by_user_name(user_name)

        if user is None:
            raise UserNameNotFoundError(user_name)
        elif not check_password_hash(user.get_password(), password):
            raise WrongPasswordError(user_name)

    def register(self, user_name, password, email, first_name, last_name):
        user = self._userRepository.get_by_user_name(user_name)
        if user is not None:
            raise UserAlreadyExistsError(user_name)

        attributes = {'user_name': user_name, 'password': generate_password_hash(password), 'email': email,
                      'first_name': first_name, 'last_name': last_name}
        new_user = User(attributes)
        self._userRepository.create(new_user)

    def delete(self, user_name, password):
        user = self._userRepository.get_by_user_name(user_name)

        if user is None:
            raise UserNameNotFoundError(user_name)
        elif not check_password_hash(user.get_password(), password):
            raise WrongPasswordError(user_name)
        self._userRepository.delete(user_name)

    def update(self, user_name, password, email, first_name, last_name):
        pass
