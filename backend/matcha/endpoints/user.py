from flask import Blueprint, request, current_app as app, g
from matcha.handlers.user import UserHandler
from matcha.handlers.auth import verify_token
from matcha.exceptions.user import UserIdNotFoundError, WrongPasswordError, UserHandlerError

bp = Blueprint('user', __name__, url_prefix='/user')
bp.before_request(verify_token)

@bp.route('/profile', methods=('GET', 'PUT'))
def profile():
    request_body = request.json

    if request.method == 'GET':
        handler = UserHandler()

        # TODO add summary error
        try:
            user_data_json = handler.get_profile(g.user_id)
        except UserIdNotFoundError as e:
            app.logger.warning(e)
            return {'error': str(e)}, 400
        except Exception as e:
            app.logger.warning(e)
            return {'error': 'Internal error'}, 500

        return user_data_json, 200
    elif request.method == 'PUT':
        handler = UserHandler()

        try:
            handler.update(request_body)
        except UserHandlerError as e:
            app.logger.warning(e)
            return {'error': str(e)}, 400
        except Exception as e:
            app.logger.warning(e)
            return {'error': 'Internal error'}, 500

        return {'success': f'profile of {request_body["username"]} is updated'}, 200

@bp.route('/delete', methods=('POST',))
def delete():
    content = request.json

    handler = UserHandler()
    if request.method == 'DELETE':
        try:
            handler.delete(g.user_id, content['password'])
            return {'success': 'User is deleted'}, 200
        except KeyError as e:
            app.logger.warning(e)
            return {'error': str(e)}, 400
        except UserIdNotFoundError as e:
            app.logger.warning(e)
            return {'error': str(e)}, 400
        except WrongPasswordError as e:
            app.logger.warning(e)
            return {'error': str(e)}, 400
