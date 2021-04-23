import json
import click

from flask import current_app as app
from flask.cli import with_appcontext
from matcha.handlers.user import UserHandler

def init_db_contents():
    with app.open_resource('data.json') as f:
        data = json.loads(f.read().decode('utf-8'))
        handler = UserHandler()

        for user_data in data['users']:
            handler.initialize(user_data)
            app.logger.info(f'Created user {user_data["username"]}')

@click.command('init-db-contents')
@with_appcontext
def init_db_contents_command():
    """Fill in data in fresh database"""
    init_db_contents()
    app.logger.info('Initialized the database contents')

def run(flask_app):
    flask_app.cli.add_command(init_db_contents_command)
