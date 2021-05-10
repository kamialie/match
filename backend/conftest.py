import os
import pytest

from match import create_app
from match.db import init_db
from match.init_db import init_db_contents
from sqlalchemy.engine.url import URL

@pytest.fixture
def app():
    DATABASE = URL(
        drivername='postgresql',
        host='db',
        username="admin",
        password="password",
        database="match"
    )

    app = create_app({
        'TESTING': True,
        'DATABASE': DATABASE,
        'SECRET_KEY': 'test'
    })
    with app.app_context():
        init_db()
        init_db_contents()

    return app

@pytest.fixture
def client(app):
    return app.test_client()
