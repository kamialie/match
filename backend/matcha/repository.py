from matcha.classes.user import User
from matcha.db import get_engine

from sqlalchemy import text

class Repository:

    def __init__(self):
        # TODO wrap in try except
        self._engine = get_engine()

class UserRepository(Repository):
    """Repository for User object related operations"""

    def get_by_username(self, username):
        result = self._engine.execute(
            text('SELECT * FROM Users WHERE username = :u'),
            u=username
        ).fetchone()

        if result is not None:
            return User(dict(result))
                # TODO make another request for interests
                # user.addInterests(interests)
                #return user

            # create and return user object if request is successful

        # return None otherwise
        return None

    def create(self, user: User):
        self._engine.execute(
            text('INSERT INTO Users (username, password, first_name, last_name, email) VALUES (:u, :p, :f, :l, :e)'),
            u=user.get_username(), p=user.get_password(), f=user.get_first_name(), l=user.get_last_name(),
            e=user.get_email()
        )

    def update(self, user: User):
        # TODO probably change condition from username to user_id
        self._engine.execute(
            text('UPDATE Users SET gender = :g,preference = :p, biography = :b WHERE username = :u'),
            u=user.get_username(), g=user.get_gender(), p=user.get_preference(), b=user.get_biography()
        )

    def delete(self, username):
        self._engine.execute(
            text('DELETE FROM Users WHERE username = :u'),
            u=username
        )
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
#
# def register_user(engine, username, password, first_name, last_name, email):
#     engine.execute(
#         text('INSERT INTO Users (username, password, first_name, last_name, email) VALUES (:u, :p, :f, :l, :e)'),
#         u=username, p=generate_password_hash(password), f=first_name, l=last_name, e=email
#     )
