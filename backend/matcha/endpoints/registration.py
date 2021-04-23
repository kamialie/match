from flask import Blueprint, request, current_app as app
from matcha.handlers.user import UserHandler
from matcha.exceptions.user import UserHandlerError

bp = Blueprint('registration', __name__, url_prefix='/register')

@bp.route('', methods=('POST', ))
def register():
    request_body = request.json

    if request.method == 'POST':
        required_attributes = ['username', 'password', 'first_name', 'last_name', 'email']
        if not all(attr in request_body for attr in required_attributes):
            return {'error': f'Required attributes - {required_attributes}'}, 400

        handler = UserHandler()
        try:
            handler.register(request_body)
        except UserHandlerError as e:
            app.logger.warning(e)
            return {'error': str(e)}, 400
        except Exception as e:
            app.logger.warning(e)
            return {'error': 'Internal error'}, 500

        return {'success': 'User created'}, 200

    return 405
