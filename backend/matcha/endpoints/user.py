from flask import Blueprint, request, current_app as app
from matcha.handlers.user import UserHandler
from matcha.exceptions.user import UserNameNotFoundError, WrongPasswordError
from matcha.handlers.auth import AuthHandler
from jwt import ExpiredSignatureError, InvalidTokenError

bp = Blueprint('user', __name__, url_prefix='/user')

bp.before_request(AuthHandler.verify_token)

@bp.route('/profile', methods=('GET', 'PUT'))
def profile():
    content = request.json

    if request.method == 'GET':
        username = content.get('username')
        token = content.get('token')
        if username is None or token is None:
            return {'error': 'Missing arguments'}, 400

        handler = UserHandler()
        try:
            user_data_json = handler.get_info(username)
            return user_data_json, 200
        except UserNameNotFoundError as e:
            app.logger.warning(e)
            return {'error': str(e)}, 400
    elif request.method == 'PUT':
        attributes = {
            'username': content.get('username'),
            'gender': content.get('gender'),
            'preference': content.get('preference'),
            'biography': content.get('biography'),
        }
        for v in attributes.values():
            if v is None:
                return {'error': 'Missing arguments'}, 400

        handler = UserHandler()
        try:
            handler.update(attributes)
            return {'success': f'profile of {attributes["username"]} is updated'}, 200
        except UserNameNotFoundError as e:
            app.logger.warning(e)
            return {'error': str(e)}, 400

@bp.route('/delete', methods=('POST',))
def delete():
    content = request.json

    handler = UserHandler()
    if request.method == 'DELETE':
        username = content.get('username')
        password = content.get('password')
        if username is None or password is None:
            return {'error': 'Missing arguments'}, 400

        try:
            handler.delete(username, password)
            return {'success': 'User is deleted'}, 200
        except UserNameNotFoundError as e:
            app.logger.warning(e)
            return {'error': str(e)}, 400
        except WrongPasswordError as e:
            app.logger.warning(e)
            return {'error': str(e)}, 400
