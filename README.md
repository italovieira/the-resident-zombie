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

## Testing

For testing purposes you can run

```sh
$ docker-compose run --rm api npm test
```


# Usage


## Signup

```sh
curl -H "Content-Type: application/json" -X POST http://localhost:8080/signup \
-d '{
  "name": "Foo",
  "age": "10",
  "gender": "m",
  "latitude": 10,
  "longitude": -10,
  "inventory": {
    "Fiji Water": 1,
    "Campbell Soup": 1,
    "First Aid Pouch": 10,
    "AK47": 1
  }
}'
```
