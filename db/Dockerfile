FROM postgres:14
COPY init-db.sh /docker-entrypoint-initdb.d/init-db.sh
RUN sed -i -e 's/\r$//' /docker-entrypoint-initdb.d/init-db.sh && \
    apt-get update && \
    apt-get install -y iproute2 && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*