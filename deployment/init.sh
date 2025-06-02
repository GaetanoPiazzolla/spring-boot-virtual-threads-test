#!/bin/bash

docker compose down --remove-orphans
docker compose rm -f
docker compose build --no-cache
docker compose up -d
docker exec db-service tc qdisc add dev eth0 root netem delay 200ms 50ms