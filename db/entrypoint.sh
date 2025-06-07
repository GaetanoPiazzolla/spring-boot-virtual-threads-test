#!/bin/bash

echo "Setting network delay: ${NETWORK_DELAY:-200ms} with jitter: ${NETWORK_JITTER:-50ms}"
sleep 5  # Wait for network interface to be ready
tc qdisc add dev eth0 root netem delay ${NETWORK_DELAY:-200ms} ${NETWORK_JITTER:-50ms}

exec docker-entrypoint.sh postgres 