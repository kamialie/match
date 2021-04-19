from flask import Blueprint, request, current_app as app

from matcha.repository import UserRepository
from matcha.classes.user import User
from matcha.exceptions.user import UserNameNotFoundError, WrongPasswordError, UserAlreadyExistsError

class UserHandler:
    """Handler for user related operations"""

    def __init__(self):
        # TODO check if user exists and set a boolean
        self._user = None
        self._userRepository = UserRepository()

    def get_info(self, username):
        """ Return user info json"""
        user = self._userRepository.get_by_username(username)

        if user is None:
            raise UserNameNotFoundError(username)
        return user.to_json()

    def delete(self, username, password):
        user = self._userRepository.get_by_username(username)

        if user is None:
            raise UserNameNotFoundError(username)
        elif not user.verify_password(password):
            raise WrongPasswordError(username)
        self._userRepository.delete(username)

    def update(self, attributes):
        user = self._userRepository.get_by_username(attributes['username'])

        if user is None:
            raise UserNameNotFoundError(attributes['username'])

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


# def get_user_id(engine, username):
#     result = engine.execute(
#         text('SELECT user_id FROM Users WHERE username = :u'),
#         u=username
#     ).fetchone()
#
#     if result is not None:
#         return result['user_id']
#
#
# def get_user(username):
#     engine = get_engine()
#
#     result = engine.execute(
#         text('SELECT * FROM Users WHERE username = :u'),
#         u=username
#     ).fetchone()
#
#     return result
