from werkzeug.security import generate_password_hash
from matcha.handlers.auth import verify_password
from matcha.repository import UserRepository
from matcha.objects.user import User
from matcha.exceptions.user import UserIdNotFoundError, WrongPasswordError, UserAlreadyExistsError

class UserHandler:
    """Handler for user related operations"""

    def __init__(self):
        self._userRepository = UserRepository()

    def get_profile(self, user_id):
        user = self._userRepository.get_user_by_id(user_id)

        if user is None:
            raise UserIdNotFoundError(user_id)
        return user.as_dict()

    def initialize(self, data):
        user = User(**data)

        if self._userRepository.get_base_user_by_name(user.name):
            raise UserAlreadyExistsError(user.name)

        user.password = generate_password_hash(user.password)
        self._userRepository.initialize(user)

    def register(self, data):
        user = User(**data)

        if self._userRepository.get_base_user_by_name(user.name):
            raise UserAlreadyExistsError(user.name)

        user.password = generate_password_hash(user.password)
        self._userRepository.create(user)

        # TODO send confirmation link to email

    # TODO consider splitting profile and password update
    # TODO consider splitting payload between token and profile attributes
    def update(self, user_id, data):
        user = User(**data, user_id=user_id)

        if not self._userRepository.get_base_user_by_id(user_id):
            raise UserIdNotFoundError(user_id)

        user.password = generate_password_hash(user.password)
        self._userRepository.update(user)

    def delete(self, user_id, password):
        user = self._userRepository.get_base_user_by_id(user_id)

        if user is None:
            raise UserIdNotFoundError(user_id)
        elif not verify_password(user.password, password):
            raise WrongPasswordError(user.name)
        self._userRepository.delete(user_id)

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
