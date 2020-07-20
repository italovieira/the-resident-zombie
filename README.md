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
curl -H "Content-Type: application/json" -X POST http://localhost:8080/survivors \
-d '{
  "id": "foo123",
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

## Update location

```sh
curl -H "Content-Type: application/json" -X PUT http://localhost:8080/survivors/foo123/location \
-d '{
  "latitude": 7,
  "longitude": -13,
}'
```

## Flag infected survivor

```sh
curl -H "Content-Type: application/json" -X POST http://localhost:8080/survivors/foo123/infected \
-d '{
  "id": bar123
}'
```


## Make trades

```sh
curl -H "Content-Type: application/json" -X POST http://localhost:8080/survivors/trades \
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
