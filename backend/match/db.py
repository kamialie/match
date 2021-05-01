import click

from flask import current_app as app, g
from flask.cli import with_appcontext
from sqlalchemy import create_engine, text

#from matcha.db_methods import register_user, get_user_id, update_profile
#from matcha.handler.user import UserHandler
#from matcha.classes.user import User

#from sqlalchemy_utils import functions


#def check_db_connection(url):
    #for i in range(5):
        #print(f'Checking db... attempt {i}')
        #result = functions.database_exists(url)
        #if result:
            #print('Connection established')
            #return True
    #print("Database not available")
    #return False


def get_engine():
    if 'engine' not in g:
        g.engine = create_engine(
            app.config['DATABASE'],
            isolation_level='AUTOCOMMIT',
            client_encoding='utf8',
            echo=False)

    return g.engine

def close_engine(e=None):
    engine = g.pop('engine', None)

    if engine is not None:
        engine.dispose()

def init_db():
    engine = get_engine()

    with engine.connect() as conn:
        with app.open_resource('schema.sql') as f:
            query = text(f.read().decode('utf8'))
            conn.execute(query)


# def init_db_contents():
#     engine = get_engine()
#
#     with current_app.open_resource('data.json') as f:
#         data = json.loads(f.read().decode('utf-8'))
#         handler = UserHandler()
#         userRepository = UserRepository()
#
#         for user_data in data['users']:
#             #handler.register(user['username'], user['password'], user['email'], user['first_name'], user['last_name'])
#             user = User(user_data)
#
#             engine.execute(
#                 text(
#                     'INSERT INTO Users (username, password, first_name, last_name, email) VALUES (:u, :p, :f, :l, :e)'),
#                 u=user['username'], p=user.get_password(), f=user.get_first_name(), l=user.get_last_name(),
#                 e=user.get_email()
#             )
#             click.echo(f'Created user {user["username"]}')
#
#             # TODO think of better way to avoid extra method call
#             #user_id = get_user_id(engine, user['username'])
#             #update_profile(engine, user_id, user['gender'], user['preference'], user['biography'], user['interests'])
#             #click.echo(f'User {user["username"]} profile updated')


@click.command('init-db')
@with_appcontext
def init_db_command():
    """Clear the existing data and create new tables."""
    init_db()
    app.logger.info('Initialized the database')


from flask_mail import Mail, Message
from match.handlers.auth import create_token

@click.command('email')
@with_appcontext
def send_email():
    app.logger.info('Sent email')
    app.logger.info(app.config)
    mail = Mail(app)
    msg = Message("Hello",
                  sender=app.config['MAIL_USERNAME'],
                  recipients=["tanteprix@yandex.ru"])

    token = create_token(1)
    msg.body = f"Hello Flask message sent from Flask-Mail - http://{app.config['HOST']}/confirm/{token}"
    mail.send(msg)


def init_app(flask_app):
    flask_app.teardown_appcontext(close_engine)
    flask_app.cli.add_command(init_db_command)
    flask_app.cli.add_command(send_email)
