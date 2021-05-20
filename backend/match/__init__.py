import os

from flask import Flask, request
from flask_cors import CORS

def create_app(test_config=None):
    # create and configure the app
    #app = Flask(__name__, instance_relative_config=True)
    app = Flask(__name__)

    if test_config is None:
        app.config.from_pyfile('config.py')
    else:
        app.config.from_mapping(test_config)

    # ensure the instance folder exists
    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass

    # handle cors policy
    CORS(app, supports_credentials=True)

    @app.route('/hello')
    def hello():
        return 'Hello, World!'

    # inject logging middleware
    @app.before_request
    def before_request_func():
        app.logger.info('Request body - %s', request.json)

    from . import db
    db.init_app(app)
    from . import init_db
    init_db.run(app)

    from match.endpoints import user, registration, auth
    app.register_blueprint(registration.bp)
    app.register_blueprint(user.bp)
    app.register_blueprint(auth.bp)

    #from . import reaction
    #app.register_blueprint(reaction.bp)

    #from . import block
    #app.register_blueprint(block.bp)

    return app

# from functools import wraps
# from flask import g, request, redirect, url_for
#
# def log_request(f):
#     @wraps(f)
#     def decorated_function(*args, **kwargs):
#         if g.user is None:
#             return redirect(url_for('login', next=request.url))
#         return f(*args, **kwargs)
#     return decorated_function
#
# @login_required
# def secret_page():
#     pass

