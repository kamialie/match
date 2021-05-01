from jwt.exceptions import InvalidTokenError

class UserIdMissingTokenError(InvalidTokenError):
    def __str__(self):
        return 'token payload does not contain user_id'

# class AuthorizationHandlerError(Exception):
#     """Base class for AuthorizationHandler errors"""
#     def __str__(self):
#         return 'AuthHandlerError'
#
# class AuthorizationHeaderMissingError(AuthorizationHandlerError):
#     def __str__(self):
#         return 'Authorization header is missing'
#
# class InvalidAuthorizationHeaderValueError(AuthorizationHandlerError):
#     def __str__(self):
#         return 'Invalid Authorization header value'
#
# class IncorrectAuthorizationHeaderTypeError(AuthorizationHandlerError):
#     def __str__(self):
#         return 'Incorrect Authorization header type'
