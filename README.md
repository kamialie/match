# Matcha

Simple (not yet fascinating) dating website!

## Requirements

+ [docker](https://docs.docker.com/get-docker/) (Docker Desktop on Mac includes `docker compose`, which is used to run
servicer)

## Application management

start the application
```shell
$ docker-compose up -d
```

stop the application
```shell
$ docker compose down
```

view logs of the container (add `-f` flag to follow output)
```shell
$ docker compose logs matcha_frontend_1
```

Backend testing is implemented using `pytest` and can be run as docker container
```shell
$ docker compose up test
```