## How to run:

Initialize with:

```shell
docker-compose down
docker-compose rm -f
docker-compose build --no-cache
docker-compose up -d
```

Add latency for the database connection:

```shell
docker exec db-service apt-get update && apt-get install iproute2 iputils-ping -y
docker exec db-service tc qdisc add dev eth0 root netem delay 250ms
```

To replace latency:

```shell
docker exec db-service tc qdisc replace dev eth0 root netem delay 200ms
```