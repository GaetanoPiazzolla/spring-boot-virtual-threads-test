# spring-boot-virtual-threads-load-test

This repository contains the code to be able to test the different performances between a spring-boot application based on virtual threads https://github.com/GaetanoPiazzolla/spring-boot-virtual-threads
and standard spring application using platform threads.

The experimental results I've found have been published in the following medium article for you to consider.

------ here ----- 

All this code is published under the GNU General Public License v3.0 and it's free for you to use and customize as you wish.

### Step 1:
Run the containers by executing the following command inside the "deployment" folder:

```shell
docker-compose rm -f
docker-compose up --build --force-recreate --remove-orphans 
```

### Step 2:

Run k6 tests in temporary container by executing the following command inside the "k6-testing" folder:

```shell
docker-compose run --rm k6 run /k6-scripts/<test-name> -e THREAD=virtual|standard -e USERS=20|40|393939... 
```

Before each test you should run the following script to make every load test independent of the previous executions.

```sql
delete from books b where b.book_id <> 1;
delete from orders ;
```

You may also want to add some latency for the database connection:

```shell
docker exec db-service apt-get update && apt-get install iproute2 iputils-ping -y
docker exec db-service tc qdisc add dev eth0 root netem delay 250ms
```

### Step 3:

Datas will be available on the grafana dashboard at: 

http://localhost:3000/d/k6/k6-load-testing-results?orgId=1&refresh=5s