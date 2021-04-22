from matcha.exceptions.user import UserAttributeError

class BaseUser:
    """User class with basic info for registration"""
    def __init__(self, username, password, first_name, last_name, email, user_id=None):
        self.id = user_id
        self.name = username
        self.password = password
        self.first_name = first_name
        self.last_name = last_name
        self.email = email

    # def as_dict(self):
    #     return self.__dict__


class User(BaseUser):
    def __init__(self, username, password, first_name, last_name,
                 email, gender, preference, biography, user_id=None, interests=None):
        super().__init__(username, password, first_name, last_name, email, user_id)
        self.gender = gender
        self.preference = preference
        self.biography = biography
        self.interests = interests

    def as_dict(self):
        return {
            'username': self.name,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'email': self.email,
            'gender': self.gender,
            'preference': self.preference,
            'biography': self.biography
        }


class UserFactory:
    """Creates object of User class"""

    # TODO remove duplicate create by adding boolean option
    @staticmethod
    def create_base_user(attributes):
        try:
            user = BaseUser(**attributes)
        except TypeError:
            raise UserAttributeError
        # run validations
        return user

    @staticmethod
    def restore_base_user(attributes):
        return BaseUser(**attributes)

    @staticmethod
    def create_user(attributes):
        try:
            user = User(**attributes)
        except TypeError:
            raise UserAttributeError
        # run validation
        return user

    @staticmethod
    def restore_user(attributes):
        return User(**attributes)



# class User:
#     """User class"""
#
#     def __init__(self):
#         self._username = value
#
#     @property
#     def username(self):
#         return self._username
#
#     @username.setter
#     def username(self, value):
#         pass
#
#     @property
#     def password(self):
#         return self._username
#
#     @password.setter
#     def password(self, value):
#         self._username = value
#
#     @property
#     def first_name(self):
#         return self._username
#
#     @first_name.setter
#     def first_name(self, value):
#         self._username = value
#
#     @property
#     def last_name(self):
#         return self._last_name
#
#     @last_name.setter
#     def last_name(self, value):
#         self._last_name = value
#
#     @property
#     def email(self):
#         return self._email
#
#     @email.setter
#     def email(self, value):
#         self._email = value
#
#     @property
#     def gender(self):
#         return self._gender
#
#     @gender.setter
#     def gender(self, value):
#         self._gender = value
#
#     @property
#     def preference(self):
#         return self._preference
#
#     @preference.setter
#     def preference(self, value):
#         self._preference = value
#
#     @property
#     def biography(self):
#         return self._biography
#
#     @biography.setter
#     def biography(self, value):
#         self._biography = value
#
#     @property
#     def interests(self):
#         return self._interests
#
#     @interests.setter
#     def interests(self, value):
#         self._interests = value
#
#     def to_json(self):
#         return {'username': self._username, 'first_name': self._first_name,
#                 'last_name': self._last_name, 'email': self._email, 'gender': self._gender,
#                 'preference': self._preference, 'biography': self._biography}
