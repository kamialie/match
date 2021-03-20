from flask import Blueprint, request, current_app as app

from matcha.handler.user import UserHandler, UserNameNotFoundError, WrongPasswordError, UserAlreadyExistsError

bp = Blueprint('user', __name__, url_prefix='/user')

@bp.route('', methods=('POST',))
def login():
    """ /login request handler """
    if request.method == 'POST':
        content = request.json
        app.logger.info(content)

        user_name = content['user_name']
        password = content['password']

        handler = UserHandler()
        try:
            handler.login(user_name, password)
            # TODO return user object
            return {'message': 'Successful login'}, 200
        except UserNameNotFoundError as e:
            app.logger.warning(e)
            return {'message': 'Incorrect user_name'}, 400
        except WrongPasswordError as e:
            app.logger.warning(e)
            return {'message': 'Incorrect password'}, 400
        except Exception as e:
            app.logger.warning(e.args)
            return {'message': 'Internal error'}, 500
    return 405

@bp.route('/register', methods=('POST', ))
def register():
    content = request.json
    app.logger.info(content)

    handler = UserHandler()
    if request.method == 'POST':
        # TODO try catch for missing fields
        user_name = content['user_name']
        password = content['password']
        email = content['email']
        last_name = content['last_name']
        first_name = content['first_name']

        try:
            handler.register(user_name, password, email, last_name, first_name)
            return {'message': 'User created successfully!'}, 201
        except UserAlreadyExistsError as e:
            app.logger.warning(e)
            return {'message': str(e)}, 400

    return 405

@bp.route('/delete', methods=('DELETE',))
def delete():
    content = request.json
    app.logger.info(content)

    handler = UserHandler()
    if request.method == 'DELETE':
        # TODO try catch for missing fields
        user_name = content['user_name']
        password = content['password']

        try:
            handler.delete(user_name, password)
            return {'message': 'User is deleted'}, 200
        except UserNameNotFoundError as e:
            app.logger.warning(e)
            return {'message': str(e)}, 400
        except WrongPasswordError as e:
            app.logger.warning(e)
            return {'message': str(e)}, 400

@bp.route('/profile', methods=('GET', 'PUT'))
def profile():
    content = request.json
    app.logger.info(content)

    handler = UserHandler()
    if request.method == 'GET':
        # TODO try catch for missing fields
        user_name = content['user_name']

        try:
            user_json = handler.get_info(user_name)
            return {'user_info': user_json}, 200
        except UserNameNotFoundError as e:
            app.logger.warning(e)
            return {'message': str(e)}, 400
    elif request.method == 'PUT':
        # TODO try catch for missing fields
        user_name = content['user_name']
        gender = content['gender']
        preference = content['preference']
        biography = content['biography']

        try:
            handler.update(user_name, gender, preference, biography)
            return {'message': f'profile of {user_name} is updated'}, 200
        except UserNameNotFoundError as e:
            app.logger.warning(e)
            return {'message': str(e)}, 400
