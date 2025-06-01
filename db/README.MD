Docker build :

Copies -init-db.sh into  /docker-entrypoint-initdb.d 

which gets automatically executed by the container when it runs for the first time. 

Also installs iproute2 in order to be able to add network delay.