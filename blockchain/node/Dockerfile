FROM ethereum/client-go:alltools-v1.8.20

ADD keystore /root/.ethereum/keystore
COPY password.txt ~/.password
ADD ./genesis.json ./genesis.json
RUN geth init genesis.json

#geth
EXPOSE 8545
EXPOSE 8546
EXPOSE 30303

# bootnode
EXPOSE 30301/udp
EXPOSE 30303/udp

#swarm
EXPOSE 8500
EXPOSE 30399