from matcha.classes.user import User
from matcha.db import get_engine

from sqlalchemy import text

class Repository:

    def __init__(self):
        # TODO wrap in try except
        self._engine = get_engine()

class UserRepository(Repository):
    """Repository for User object related operations"""

    def get_by_user_name(self, user_name):
        result = self._engine.execute(
            text('SELECT * FROM Users WHERE user_name = :u'),
            u=user_name
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
            text('INSERT INTO Users (user_name, password, first_name, last_name, email) VALUES (:u, :p, :f, :l, :e)'),
            u=user.get_user_name(), p=user.get_password(), f=user.get_first_name(), l=user.get_last_name(),
            e=user.get_email()
        )

    def update(self, user: User):
        self._engine.execute(
            text('UPDATE Users SET first_name = :f, last_name = :l, gender = :g,'
                 'preference = :p, biography = :b WHERE user_name = :u'),
            u=user.get_user_name(), f=user.get_first_name(), l=user.get_last_name(), g=user.get_gender(),
            p=user.get_preference(), b=user.get_biography()
        )

    def delete(self, user_name):
        self._engine.execute(
            text('DELETE FROM Users WHERE user_name = :u'),
            u=user_name
        )
