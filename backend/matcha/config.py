from os  import environ
from sqlalchemy.engine.url import URL

DATABASE = URL(
    drivername='postgres',
    host='db',
    username=environ['POSTGRES_USER'],
    password=environ['POSTGRES_PASSWORD'],
    database=environ['POSTGRES_DB']
)

MAIL_SERVER = environ['MAIL_SERVER']
MAIL_PORT = 465
MAIL_USERNAME = environ['MAIL_USERNAME']
MAIL_PASSWORD = environ['MAIL_PASSWORD']
MAIL_USE_TLS = False
MAIL_USE_SSL = True

HOST = environ['HOST']
