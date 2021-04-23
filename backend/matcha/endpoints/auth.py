from flask import Blueprint, request, current_app as app
from matcha.handlers.auth import AuthHandler
from matcha.exceptions.user import UserHandlerError

bp = Blueprint('auth', __name__, url_prefix='/auth')

@bp.route('/login', methods=('POST',))
def login():
    request_body = request.json

    if request.method == 'POST':
        #TODO move to helper function
        required_attributes = ['username', 'password']
        if not all(attr in request_body for attr in required_attributes):
            return {'error': f'Required attributes - {required_attributes}'}, 400

        handler = AuthHandler()
        try:
            user_data_json = handler.login(request_body['username'], request_body['password'])
        except UserHandlerError as e:
            app.logger.warning(e.args)
            return {'error': str(e)}, 400
        except Exception as e:
            app.logger.warning(e.args)
            return {'error': 'Internal error'}, 500

        return user_data_json, 200

    return 405
