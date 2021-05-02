from werkzeug.security import generate_password_hash
from flask import current_app as app
from flask_mail import Mail, Message
from match.handlers.auth import create_token
from match.objects.user import User
from match.repository import UserRepository
from match.exceptions.user import UserAlreadyExistsError

class RegistrationHandler:
    def __init__(self):
        self._userRepository = UserRepository()

    def register(self, data):
        user = User(**data)

        if self._userRepository.get_base_user_by_name(user.name):
            raise UserAlreadyExistsError(user.name)

        user.password = generate_password_hash(user.password)
        user_id = self._userRepository.create(user)

        # TODO send confirmation link to email
        app.logger.info('Sent email')
        # app.logger.info(app.config)
        mail = Mail(app)
        msg = Message("Hello", sender=app.config['MAIL_USERNAME'], recipients=[user.email])
        # recipients=["tanteprix@yandex.ru"])

        token = create_token(user_id)
        app.logger.info(f'token - {token}')
        msg.body = f"Hello Flask message sent from Flask-Mail - http://{app.config['HOST']}/confirm/{token}"
        mail.send(msg)

    def confirm(self, user_id):
        #TODO run checks
        self._userRepository.confirm(user_id)
