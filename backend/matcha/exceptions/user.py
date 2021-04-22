class UserHandlerError(Exception):
    """Base class for UserHandler errors"""
    def __str__(self):
        return 'UserHandlerError'

# TODO add arguments to distinguish between login and delete
class UserNameNotFoundError(UserHandlerError):
    def __init__(self, username):
        self.username = username

    def __str__(self):
        return f'username {self.username} is not found!'

class UserIdNotFoundError(UserHandlerError):
    def __init__(self, user_id):
        self.user_id = user_id

    def __str__(self):
        return f'user_id {self.user_id} is not found!'

class WrongPasswordError(UserHandlerError):
    def __init__(self, username):
        self.username = username

    def __str__(self):
        return f'{self.username} user entered wrong password!'

class UserAlreadyExistsError(UserHandlerError):
    def __init__(self, username):
        self.username = username

    def __str__(self):
        return f'{self.username} user already exists!'

# TODO change to AttributeError
class UserAttributeError(UserHandlerError):
    def __init__(self, *attributes):
        self.attr = attributes

    def __str__(self):
        return f'Valid attributes - {self.attr}'
