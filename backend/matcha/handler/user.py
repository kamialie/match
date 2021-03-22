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
        return user.to_json()

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

    def update(self, user_name, gender, preference, biography):
        user = self._userRepository.get_by_user_name(user_name)

        if user is None:
            raise UserNameNotFoundError(user_name)

        attributes = {'user_name': user_name, 'gender': gender, 'preference': preference, 'biography': biography}
        new_user = User(attributes)
        self._userRepository.update(new_user)

        # app.logger.info(f'interests:')
        # for item in interests:
        #     app.logger.info(f'- {item}')

        # # construct list of ids for incoming data
        # interest_rows = []
        # for item in interests:
        #     result = engine.execute(
        #         text('SELECT interest_id FROM Interests WHERE name = :n'),
        #         n=item
        #     ).fetchone()
        #     if result is None:
        #         # add new entry
        #         result = engine.execute(
        #             text('INSERT INTO Interests (name) VALUES (:n) RETURNING interest_id'),
        #             n=item
        #         ).fetchone()
        #         interest_rows.append((user_id, result["interest_id"]))
        #     else:
        #         interest_rows.append((user_id, result['interest_id']))
        #
        # # clear all relations and add new
        # # TODO think of other ways to remove extra work
        # engine.execute(
        #     text('DELETE FROM UserInterestRelation WHERE user_id = :u; '
        #          f'INSERT INTO UserInterestRelation VALUES {str(interest_rows)[1:-1]}'),
        #     u=user_id
        # )
        # result = engine.execute(
        #     text('SELECT I.name FROM Interests I JOIN UserInterestRelation R ON R.interest_id = I.interest_id '
        #          'JOIN Users U on R.user_id = U.user_id WHERE U.user_id = :u'),
        #     u=user_id
        # ).fetchall()
        #
        # user_profile["user"]["interests"] = [r["name"] for r in result]


# def get_user_id(engine, user_name):
#     result = engine.execute(
#         text('SELECT user_id FROM Users WHERE user_name = :u'),
#         u=user_name
#     ).fetchone()
#
#     if result is not None:
#         return result['user_id']
#
#
# def get_user(user_name):
#     engine = get_engine()
#
#     result = engine.execute(
#         text('SELECT * FROM Users WHERE user_name = :u'),
#         u=user_name
#     ).fetchone()
#
#     return result
