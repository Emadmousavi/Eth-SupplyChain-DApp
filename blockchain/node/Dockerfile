FROM base_image:latest

ADD keystore /root/.ethereum/keystore
COPY password.txt ~/.password
ADD ./genesis.json ./genesis.json
RUN geth init genesis.json


EXPOSE 8545
EXPOSE 8546
EXPOSE 30303
