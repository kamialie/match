from flask import Blueprint, request, current_app as app, g
from match.handlers.user import UserHandler
from match.handlers.auth import verify_token
from match.exceptions.user import UserHandlerError

bp = Blueprint('user', __name__, url_prefix='/user')
bp.before_request(verify_token)

@bp.route('/profile', methods=('GET', 'PUT'))
def profile():
    if request.method == 'GET':
        handler = UserHandler()

        try:
            user_data_json = handler.get_profile(g.user_id)
        except UserHandlerError as e:
            app.logger.warning(e)
            return {'error': str(e)}, 400
        except Exception as e:
            app.logger.error(e)
            return {'error': 'Internal error'}, 500

        return user_data_json, 200
    elif request.method == 'PUT':
        request_body = request.json

        required_attributes = ['username', 'password', 'first_name', 'last_name',
                               'email', 'gender', 'preference', 'biography']
        if not all(attr in request_body for attr in required_attributes):
            return {'error': f'Required attributes - {required_attributes}'}, 400

        handler = UserHandler()
        try:
            handler.update(g.user_id, request_body)
        except UserHandlerError as e:
            app.logger.warning(e)
            return {'error': str(e)}, 400
        except Exception as e:
            app.logger.error(e)
            return {'error': 'Internal error'}, 500

        return {'success': f'profile of {request_body["username"]} is updated'}, 200

    return 405

@bp.route('/delete', methods=('POST',))
def delete():
    request_body = request.json

    if request.method == 'POST':
        if 'password' not in request_body:
            return {'error': "Required attributes - ['password']"}, 400

        handler = UserHandler()
        try:
            handler.delete(g.user_id, request_body['password'])
        except UserHandlerError as e:
            app.logger.warning(e)
            return {'error': str(e)}, 400
        except Exception as e:
            app.logger.error(e)
            return {'error': 'Internal error'}, 500

        return {'success': 'User is deleted'}, 200

    return 405
