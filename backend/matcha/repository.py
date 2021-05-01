from matcha.objects.user import User
from matcha.db import get_engine

from sqlalchemy import text

class Repository:

    def __init__(self):
        # TODO wrap in try except
        self._engine = get_engine()

class UserRepository(Repository):
    """Repository for User object related operations"""

    def get_base_user_by_name(self, username):
        result = self._engine.execute(
            text('SELECT username, password, first_name, last_name, email FROM Users WHERE username = :u'),
            u=username
        ).fetchone()

        if result is not None:
            return User(**result)
        return None

    def get_base_user_by_id(self, user_id):
        result = self._engine.execute(
            text('SELECT username, password, first_name, last_name, email FROM Users WHERE user_id = :u'),
            u=user_id
        ).fetchone()

        if result is not None:
            return User(**result)
        return None

    def get_user_by_id(self, user_id):
        result = self._engine.execute(
            text('SELECT username, password, first_name, last_name, email, gender, preference, biography '
                 'FROM Users WHERE user_id = :u'),
            u=user_id
        ).fetchone()

        if result is not None:
            return User(**result)
        return None

    def get_user_by_name(self, username):
        result = self._engine.execute(
            text('SELECT user_id, username, password, first_name, last_name, email, gender, preference, biography '
                 'FROM Users WHERE username = :u'),
            u=username
        ).fetchone()

        if result is not None:
            return User(**result)
        return None

    def create(self, user: User):
        self._engine.execute(
            text('INSERT INTO Users (enabled, username, password, first_name, last_name, email) '
                 'VALUES (:e, :u, :p, :f, :l, :em)'),
            e=user.enabled, u=user.name, p=user.password, f=user.first_name, l=user.last_name, em=user.email
        )

    def initialize(self, user: User):
        self._engine.execute(
            text('INSERT INTO Users (enabled, username, password, first_name, last_name,'
                 'email, gender, preference, biography) '
                 'VALUES (:e, :u, :p, :f, :l, :e, :g, :pr, :b)'),
            e=user.enabled, u=user.name, p=user.password, f=user.first_name, l=user.last_name, em=user.email,
            g=user.gender, pr=user.preference, b=user.biography
        )

    def update(self, user: User):
        # TODO consider removing option to update existing username
        self._engine.execute(
            text('UPDATE Users SET username = :n, password = :p, first_name = :f, last_name = :l, email = :e,'
                 'gender = :g, preference = :pr, biography = :b WHERE user_id = :u'),
            u=user.id, n=user.name, p=user.password, f=user.first_name, l=user.last_name, e=user.email,
            g=user.gender, pr=user.preference, b=user.biography
        )

    def confirm(self, user_id):
        self._engine.execute(
            text('UPDATE Users SET enabled = TRUE WHERE user_id = :u'), u=user_id
        )

    def delete(self, user_id):
        self._engine.execute(
            text('DELETE FROM Users WHERE user_id = :u'),
            u=user_id
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
