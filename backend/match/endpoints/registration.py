from flask import Blueprint, request, current_app as app, g
from jwt import InvalidTokenError
from match.handlers.registration import RegistrationHandler
from match.handlers.auth import decode_token
from match.exceptions.user import UserHandlerError

bp = Blueprint('registration', __name__, url_prefix='/register')

@bp.route('', methods=('POST', ))
def register():
    request_body = request.json

    if request.method == 'POST':
        required_attributes = ['username', 'password', 'first_name', 'last_name', 'email']
        if not all(attr in request_body for attr in required_attributes):
            return {'error': f'Required attributes - {required_attributes}'}, 400

        handler = RegistrationHandler()
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

@bp.route('/confirm/<token>')
def confirm_email(token):

    app.logger.info(token)
    try:
        decode_token(token)
    except InvalidTokenError as e:
        msg = f'Invalid token - {e}'
        app.logger.warning(msg)
        return {'error': msg}, 400

    handler = RegistrationHandler()
    handler.confirm(g.user_id)
    return {'success': 'User confirmed'}, 200
