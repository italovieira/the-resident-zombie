#!/bin/sh

# docker-compose.yml path
APP_ROOT_PATH="$(dirname "${BASH_SOURCE[0]}")"/..
cd $APP_ROOT_PATH

docker-compose run --rm api npm test
docker-compose up -d
docker-compose exec api node bin/seedDatabase
