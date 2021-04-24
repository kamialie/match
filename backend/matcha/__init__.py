import os

from flask import Flask, request
from flask_cors import CORS

def create_app():
    # create and configure the app
    #app = Flask(__name__, instance_relative_config=True)
    app = Flask(__name__)

    # handle cors policy
    CORS(app, supports_credentials=True)

    # inject logging middleware
    @app.before_request
    def before_request_func():
        app.logger.info('Request body - %s', request.json)

    app.config.from_pyfile('dev_config.py')

    # ensure the instance folder exists
    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass

    # a simple page that says hello
    @app.route('/')
    def hello():
        return 'Hello, World!'

    from . import db
    db.init_app(app)
    from . import init_db
    init_db.run(app)

    from matcha.endpoints import user, registration, auth
    app.register_blueprint(registration.bp)
    app.register_blueprint(user.bp)
    app.register_blueprint(auth.bp)

    #from . import reaction
    #app.register_blueprint(reaction.bp)

    #from . import block
    #app.register_blueprint(block.bp)

    return app
