# k6 Installation

## macOS
```shell
brew install k6
```

## Windows
```shell
choco install k6
```

# For local de-containerized testing

```shell
k6 run ./js/load-test.js -e USERS=20 -e BASE_URL=http://localhost:8081/
```

# For container test run with:

```shell
cd k6-testing
docker compose run --rm k6 run /k6-scripts/load-test.js -e BASE_URL=http://spring-boot-virtual-threads-jdk24:8080/ -e USERS=20
docker compose run --rm k6 run /k6-scripts/load-test.js -e BASE_URL=http://spring-boot-virtual-threads-jdk19:8080/ -e USERS=20
docker compose run --rm k6 run /k6-scripts/load-test.js -e BASE_URL=http://spring-boot-platform-threads-jdk19:8080/ -e USERS=20
```

Before each test you should run the following script to make every load test independent of the previous executions.

```sql
delete from books b where b.book_id <> 1;
delete from orders ;
```

Data will be available on the grafana dashboard reachable
at: http://localhost:3000/d/k6/k6-load-testing-results?orgId=1&refresh=5s
