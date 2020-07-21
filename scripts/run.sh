#!/bin/sh
cd ..
docker-compose run --rm api npm test
docker-compose up -d
docker-compose exec api node bin/seedDatabase
