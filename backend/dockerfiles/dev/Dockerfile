FROM python:3.8.5

ENV FLASK_APP=match
ENV FLASK_ENV=development

WORKDIR /app
COPY requirements.txt ./
RUN pip install -r requirements.txt

ENTRYPOINT flask init-db \
            && flask init-db-contents \
            && flask run --host=0.0.0.0
