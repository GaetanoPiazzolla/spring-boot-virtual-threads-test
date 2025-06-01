## How to run:

Initialize with:

```shell
docker compose down --remove-orphans
docker compose rm -f
docker compose build --no-cache
docker compose up -d
docker exec db-service tc qdisc add dev eth0 root netem delay 200ms 50ms
```

Replace latency for the database connection, where X is the base delay in milliseconds and Y is the delta applied

```shell
docker exec db-service tc qdisc replace dev eth0 root netem delay Xms Yms
```