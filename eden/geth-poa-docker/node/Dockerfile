FROM base_image:latest

ARG miner_password
ARG miner_privatekey
ARG node_password
ARG node_privatekey
RUN echo $miner_password > ~/.miner_accountpassword
RUN echo $miner_privatekey > ~/.miner_privatekey
RUN echo $node_password > ~/.node_accountpassword
RUN echo $node_privatekey > ~/.node_privatekey
ADD ./genesis.json ./genesis.json
RUN geth init genesis.json
RUN geth account import --password ~/.miner_accountpassword  ~/.miner_privatekey
RUN geth account import --password ~/.node_accountpassword  ~/.node_privatekey

ENV node_address=""
ENV miner_address=""
ENV bootnodeId=""
ENV bootnodeIp=""

CMD exec geth --bootnodes "enode://$bootnodeId@$bootnodeIp:30301" --networkid "6660001" --verbosity 4 --http --http.addr "0.0.0.0" --http.port 8545 --http.api "eth,web3,net,admin,debug,miner,personal" --http.corsdomain "*" --ws --ws.addr "0.0.0.0" --ws.port 8546 --ws.api "eth,web3,net,admin,debug,miner,personal" --ws.origins "*" --syncmode full --gcmode archive --unlock $node_address --password ~/.node_accountpassword --allow-insecure-unlock

EXPOSE 8545
EXPOSE 8546
EXPOSE 30303
