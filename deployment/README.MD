## How to run:

Initialize by running the init.sh script.

Replace latency for the database connection, where X is the base delay in milliseconds and Y is the delta applied

```shell
docker exec db-service tc qdisc replace dev eth0 root netem delay Xms Yms
```