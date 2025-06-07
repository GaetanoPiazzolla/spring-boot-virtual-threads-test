#!/bin/bash

docker compose down --remove-orphans
docker compose rm -f
docker compose build --no-cache
docker compose up -d