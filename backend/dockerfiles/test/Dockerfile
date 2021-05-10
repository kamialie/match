FROM python:3.8.5

WORKDIR /app
COPY requirements_dev.txt ./
RUN pip install -r requirements_dev.txt && pip install pytest==6.2.3

ENTRYPOINT pytest
