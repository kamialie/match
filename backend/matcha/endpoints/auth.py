from flask import Blueprint, request, current_app as app
from matcha.handlers.auth import AuthHandler
from matcha.exceptions.user import UserHandlerError

bp = Blueprint('auth', __name__, url_prefix='/auth')

@bp.route('/login', methods=('POST',))
def login():
    if request.method == 'POST':
        handler = AuthHandler()

        try:
            user_data_json = handler.login(request.json)
        except UserHandlerError as e:
            app.logger.warning(e.args)
            return {'error': str(e)}, 400
        except Exception as e:
            app.logger.warning(e.args)
            return {'error': 'Internal error'}, 500

        return user_data_json, 200
    return 405
