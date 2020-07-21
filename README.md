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
DB_NAME=resident
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
$ docker-compose exec api node bin/seedDatabase
```

## Staring

You can run the script `scripts/run.sh` (from the repository root path) to check tests, start the server and for seeding the database in one line call.

```sh
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

Suppose you have created the `.env` sample below, to enter mongodb console you can run

```sh
$ docker-compose exec db mongo mongodb://mongo:mongo@db:27017/resident?authSource=admin
```

Once in it, you can run `db.survivors.find()` to list inserted survivors into the database

# Usage

If you followed the steps above, you can copy and past the shell codes below to see the results

## Signup

```sh
$ curl -H "Content-Type: application/json" -X POST http://localhost:8080/survivors \
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

`id` must be a unique string of characters and numbers with minimum size of 2 and maximum 20

`inventory` must be an object with keys containing one or more of 'Fiji Water', 'Campbell Soup', 'First Aid Pouch', 'AK47'. Be aware that the keys are case sensitive, so 'fiji water' is not a valid key.

## Update location

```sh
$ curl -H "Content-Type: application/json" -X PUT http://localhost:8080/survivors/batman/location \
-d '{
  "latitude": 7,
  "longitude": -13
}'
```

## Flag infected survivor

```sh
$ curl -H "Content-Type: application/json" -X POST http://localhost:8080/survivors/robin/infected \
-d '{
  "id": "penguin"
}'
```

To be clear, in this example survivor 'Robin' flags 'Penguin' as infected


## Make trades

```sh
$ curl -H "Content-Type: application/json" -X POST http://localhost:8080/trades \
-d '[
      {
        "id": "joker",
        "items": {
          "Campbell Soup": 6,
          "AK47": 6
        }
      },
      {
        "id": "harleyquinn",
        "items": {
          "Fiji Water": 5,
          "First Aid Pouch": 5
        }
      }
]'
```

`items` follow the same rules applied to `inventory` at signup.

## Report

```sh
$ curl -X GET http://localhost:8080/reports
```
```json
{
  "infected": {
    "total": 2,
    "percentage": 25
  },
  "nonInfected": {
    "total": 6,
    "percentage": 75
  },
  "lostPoints": 702,
  "averageResourcesPerSurvivor": {
    "Fiji Water": 25.333333333333332,
    "Campbell Soup": 22.666666666666668,
    "First Aid Pouch": 16.833333333333332,
    "AK47": 5.666666666666667
  }
}
```

