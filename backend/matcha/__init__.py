import os

from flask import Flask, request
from flask_cors import CORS
from sqlalchemy.engine.url import URL

def create_app(test_config=None):
    # create and configure the app
    app = Flask(__name__, instance_relative_config=True)

    # handle cors policy
    CORS(app, supports_credentials=True)

    # inject logging middleware
    @app.before_request
    def before_request_func():
        app.logger.info('Request body - %s', request.json)

    database = {
        'drivername': 'postgres',
        'username': 'admin',
        'password': 'password',
        'host': 'db',
        'database': 'matcha'
    }
    app.config.from_mapping(
        SECRET_KEY='dev',
        DATABASE=URL(**database)
    )

    if test_config is None:
        # load the instance config, if it exists, when not testing
        app.config.from_pyfile('config.py', silent=True)
    else:
        # load the test config if passed in
        app.config.from_mapping(test_config)

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

    #from . import user
    #app.register_blueprint(user.bp)
    from matcha.endpoints import user
    app.register_blueprint(user.bp)

    from matcha.endpoints import auth
    app.register_blueprint(auth.bp)

    #from . import reaction
    #app.register_blueprint(reaction.bp)

    #from . import block
    #app.register_blueprint(block.bp)

    return app
