#!/bin/bash

docker compose up -d

sleep 5

docker exec todo-api-dev-mongodb1 /scripts/rs-init.sh