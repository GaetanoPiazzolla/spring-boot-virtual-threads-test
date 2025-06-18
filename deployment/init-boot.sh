#!/bin/bash

docker-compose stop spring-boot-virtual-threads
docker-compose rm -f spring-boot-virtual-threads
docker rmi deployment-spring-boot-virtual-threads
docker-compose up --build -d spring-boot-virtual-threads
