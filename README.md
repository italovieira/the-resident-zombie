# The Resident Zombie

## Installation (via docker-compose)

Create a `.env` file with the variables to fit your environment

```console
$ cat .env
PORT=8080
DB_USER=mongo
DB_PASSWORD=mongo
DB_HOST=localhost
DB_PORT=27017
DB_NAME=test
DB_OPTIONS=authSource=admin
```

Use the following command to run the server

```sh
$ docker-compose up
```

Or to run in the background

```sh
$ docker-compose up -d
```

For seed database with sample data

```sh
docker-compose exec api node bin/seedDatabase
```

## Testing

For testing purposes you can run

```sh
$ docker-compose run --rm api npm test
```

To check test coverage

```sh
$ docker-compose run --rm api npx jest --coverage
```

Suppose you have created the .env sample below, to enter mongodb console you can run

```sh
docker-compose exec db mongo mongodb://mongo:mongo@db:27017/zombie?authSource=admin
```

Once in it, you can run `db.survivors.find()` to list inserted survivors into the database

# Usage

If you followed the step to seed database, you can copy and past the shell codes below to see the result

## Signup

```sh
curl -H "Content-Type: application/json" -X POST http://localhost:8080/survivors \
-d '{
  "id": "poisonivy",
  "name": "Poison Ivy",
  "age": "34",
  "gender": "f",
  "latitude": 56,
  "longitude": -87,
  "inventory": {
    "Fiji Water": 5,
    "Campbell Soup": 4,
    "First Aid Pouch": 6,
    "AK47": 1
  }
}'
```

## Update location

```sh
curl -H "Content-Type: application/json" -X PUT http://localhost:8080/survivors/poisonivy/location \
-d '{
  "latitude": 7,
  "longitude": -13,
}'
```

## Flag infected survivor

```sh
curl -H "Content-Type: application/json" -X POST http://localhost:8080/survivors/poisonivy/infected \
-d '{
  "id": robin
}'
```


## Make trades

```sh
curl -H "Content-Type: application/json" -X POST http://localhost:8080/trades \
-d '[
      {
        id: 'joker',
        items: {
          'Campbell Soup': 6,
          AK47: 6,
        },
      },
      {
        id: 'harleyquinn',
        items: {
          'Fiji Water': 5,
          'First Aid Pouch': 5,
        },
      },
]'
```

## Report

```sh
curl -X GET http://localhost:8080/reports
```

