import json

from flask import current_app as app

class User:
    """User class"""

    def __init__(self, attributes):
        self._user_name = attributes.get('user_name', None)
        self._password = attributes.get('password', None)
        self._first_name = attributes.get('first_name', None)
        self._last_name = attributes.get('last_name', None)
        self._email = attributes.get('email', None)
        self._gender = attributes.get('gender', None)
        self._preference = attributes.get('preference', None)
        self._biography = attributes.get('biography', None)
        self._interests = attributes.get('interests', None)

    def get_user_name(self):
        return self._user_name

    def get_password(self):
        return self._password

    def get_email(self):
        return self._email

    def get_first_name(self):
        return self._first_name

    def get_last_name(self):
        return self._last_name

    def get_gender(self):
        return self._gender

    def get_preference(self):
        return self._preference

    def get_biography(self):
        return self._biography

    def add_interests(self, *interests):
        self._interests = interests

    def to_json(self):
        return {'user_name': self._user_name, 'first_name': self._first_name,
                'last_name': self._last_name, 'email': self._email, 'gender': self._gender,
                'preference': self._preference, 'biography': self._biography}
