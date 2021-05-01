FROM python:3.8.5

ENV FLASK_APP=matcha
ENV FLASK_ENV=development

WORKDIR /app
COPY requirements_dev.txt ./
RUN pip install -r requirements_dev.txt

ENTRYPOINT flask init-db \
            && flask init-db-contents \
            && flask run --host=0.0.0.0
