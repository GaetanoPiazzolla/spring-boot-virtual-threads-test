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
k6 run ./js/load-test.js -e BASE_URL=http://localhost:8080/ -e USERS=20
```

# For container test run with:

```shell
docker compose run --rm k6 run /k6-scripts/load-test.js -e BASE_URL=http://spring-boot-virtual-threads:8080/ -e USERS=20
```

```shell
docker compose run --rm k6 run /k6-scripts/load-test-mixed.js -e BASE_URL=http://spring-boot-virtual-threads:8080/ -e USERS=20
```

# Output
Will be available at: http://localhost:3000/d/k6/k6-load-testing-results
