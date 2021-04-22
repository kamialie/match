from jwt.exceptions import InvalidTokenError

class UserIdMissingTokenError(InvalidTokenError):
    def __str__(self):
        return 'Token payload does not contain user_id'
