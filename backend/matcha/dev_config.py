from os import environ
from sqlalchemy.engine.url import URL

SECRET_KEY = 'dev'

DATABASE = URL(
    drivername='postgres',
    host='db',
    username=environ['POSTGRES_USER'],
    password=environ['POSTGRES_PASSWORD'],
    database=environ['POSTGRES_DB']
)

# Flask Mail configuration
MAIL_SERVER = 'smtp.yandex.com',
MAIL_PORT = 465,
MAIL_USERNAME = 'tanteprix@yandex.ru',
MAIL_PASSWORD = 'VRemyasnova8',
MAIL_USE_TLS = False,
MAIL_USE_SSL = True
