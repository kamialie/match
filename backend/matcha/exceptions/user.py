class UserHandlerError(Exception):
    """Base class for UserHandler errors"""
    pass

# TODO add arguments to distinguish between login and delete
class UserNameNotFoundError(UserHandlerError):
    def __init__(self, username):
        self.username = username

    def __str__(self):
        return f'username {self.username} is not found!'


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

