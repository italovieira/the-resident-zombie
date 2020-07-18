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
