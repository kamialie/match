import json
import click

from flask import current_app
from flask.cli import with_appcontext

from matcha.handler.user import UserHandler

def init_db_contents():
    with current_app.open_resource('data.json') as f:
        data = json.loads(f.read().decode('utf-8'))
        handler = UserHandler()

        for user in data['users']:
            handler.register(user['username'], user['password'], user['email'], user['first_name'], user['last_name'])
            click.echo(f'Created user {user["username"]}')

            # TODO think of better way to avoid extra method call
            #user_id = get_user_id(engine, user['username'])
            #update_profile(engine, user_id, user['gender'], user['preference'], user['biography'], user['interests'])
            #click.echo(f'User {user["username"]} profile updated')


@click.command('init-db-contents')
@with_appcontext
def init_db_contents_command():
    """Fill in data in fresh database"""
    init_db_contents()
    click.echo('Initialized the database contents')

def run(app):
    app.cli.add_command(init_db_contents_command)
