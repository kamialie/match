from flask import Blueprint, request, current_app as app
from matcha.handlers.user import UserHandler
from matcha.exceptions.user import UserAlreadyExistsError

@bp.route('/register', methods=('POST', ))
def register():
    content = request.json

    if request.method == 'POST':
        handler = UserHandler()
        try:
            handler.register(content)
        except Exception as e:
            app.logger.warning(e)
            return {'error': str(e)}, 400
        return {'success': 'user created'}, 200

    return 405

