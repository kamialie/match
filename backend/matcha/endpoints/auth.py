from flask import Blueprint, request, current_app as app
from matcha.exceptions.user import UserNameNotFoundError, WrongPasswordError, UserAlreadyExistsError
from matcha.handlers.auth import AuthHandler


bp = Blueprint('auth', __name__, url_prefix='/auth')

@bp.route('/login', methods=('POST',))
def login():
    if request.method == 'POST':
        content = request.json
        username = content.get('username')
        password = content.get('password')
        if username is None or password is None:
            return {'error': 'Missing arguments'}, 400

        handler = AuthHandler()
        try:
            user_data_json = handler.login(username, password)
            return user_data_json, 200
        except UserNameNotFoundError as e:
            app.logger.warning(e)
            return {'error': 'Incorrect username'}, 400
        except WrongPasswordError as e:
            app.logger.warning(e)
            return {'error': 'Incorrect password'}, 400
        except Exception as e:
            app.logger.warning(e.args)
            return {'error': 'Internal error'}, 500
    return 405

@bp.route('/register', methods=('POST', ))
def register():
    content = request.json

    handler = AuthHandler()
    if request.method == 'POST':
        attributes = {
            'username': content.get('username'),
            'password': content.get('password'),
            'email': content.get('email'),
            'last_name': content.get('last_name'),
            'first_name': content.get('first_name')
        }
        for v in attributes.values():
            if v is None:
                return {'error': 'Missing arguments'}, 400

        try:
            user_data_json = handler.register(attributes)
            return user_data_json, 200
        except UserAlreadyExistsError as e:
            app.logger.warning(e)
            return {'error': str(e)}, 400

    return 405

