# DApp

<h1 align="center">
  <br>
  <a><img src="https://github.com/Emadmousavi/Eth-SupplyChain-DApp/blob/main/DApp/images/logo.png" width="200"></a>
  <br>  
  Supply-Chain-Dapp
  <br>
</h1>

<p align="center">
  
  <a href="https://soliditylang.org/">
    <img src="https://github.com/Emadmousavi/Eth-SupplyChain-DApp/blob/main/DApp/images/Solidity.svg" width="80">       
  </a>
  <a href="https://reactjs.org/"><img src="https://github.com/Emadmousavi/Eth-SupplyChain-DApp/blob/main/DApp/images/react.png" width="80"></a>
  
  <a href="https://www.trufflesuite.com/">
    <img src="https://github.com/Emadmousavi/Eth-SupplyChain-DApp/blob/main/DApp/images/trufflenew.png" width="50">
  </a>
   &nbsp;&nbsp;&nbsp;
  <a href="https://www.npmjs.com/package/web3">
    <img src="https://github.com/Emadmousavi/Eth-SupplyChain-DApp/blob/main/DApp/images/web3.jpg" width="60">
  </a>
  
  <a href="https://material-ui.com/">
    <img src="https://github.com/Emadmousavi/Eth-SupplyChain-DApp/blob/main/DApp/images/mat.png" width="60">       
  </a>
  &nbsp;&nbsp;&nbsp;
  <a href="https://expressjs.com/"><img src="https://github.com/Emadmousavi/Eth-SupplyChain-DApp/blob/main/DApp/images/express.svg" width="50"></a>
  &nbsp;&nbsp;
  <a href="https://www.nginx.com/">
    <img src="https://github.com/Emadmousavi/Eth-SupplyChain-DApp/blob/main/DApp/images/nginx.png" width="80">
  </a>
</p>

<h4 align="center">A simple Supply Chain setup with <a href="https://docs.soliditylang.org/en/v0.8.4/" target="_blank">Solidity</a>.</h4>

<p align="center">
  <a >
    <img src="https://img.shields.io/badge/dependencies-up%20to%20date-brightgreen.svg">
  </a>
</p>

<p align="center">
  <a href="#description">Description</a> •
  <a href="#architecture">Architecture</a> •
  <a href="#flow">Flow</a> •
  <a href="#working">Working</a> •
  <a href="#contract-diagrams">Contract Diagrams</a> •
  <a href="#installation-and-setup">Installation and Setup</a> •
</p>

### Description
Supply chain is always hard to manage and requires a lot of admistrative machinery. However, when managed with smart contracts using blockchain, a lot of the paperwork is reduced.
Also it leads to an increase in the transparency and helps to build an efficient Root of Trust. Supply-chain-dapp is such an implementation of a supply chain management system which uses blockchain to ensure a transparent and secure transfer of product from the manufacturer to the customer via the online e-commerce websites. 
### Architecture
The smart contract is being written with Solidity which is then compiled, migrated and deployed using Truffle.js on the local blockchain network created using docker-compose(geth nodes).The frontend uses Web3.js to communicate with the smart contract and local blockchain network and is written using React.js framework for better component and state lifecycle management.The requests from user are forwarded to frontend through Nginx(load balancer) and Express.js for dynamic routing.
<p align="centre">  
    <img src="https://github.com/Emadmousavi/Eth-SupplyChain-DApp/blob/main/DApp/images/images/architecturefinal.png?raw=true" >  
</p>

### Flow
<p align="centre">  
    <img src="https://github.com/Emadmousavi/Eth-SupplyChain-DApp/blob/main/DApp/images/flow.png" width="300">  
</p>

### Working
<img src="https://user-images.githubusercontent.com/55195287/124394128-9646a600-dd1b-11eb-8bf1-233320762f1c.png" />
<img src="https://user-images.githubusercontent.com/55195287/124394171-d4dc6080-dd1b-11eb-87b2-127daa32481a.png" />

<p>
  The lifecycle of a product starts when <strong>manufactureProduct()</strong> is called(while making an entry) after the final product is manufactured and the product and manufacturer details are entered in the blockchain. The <strong>productHistory[]</strong> gets initialized and the current product data is stored with the current owner(manufacturer).
</p>
<p>
  Now this product shall be available to the Third Party for purchase. On being purchased by a third party seller, the <strong>purchasedByThirdParty()</strong> gets called where the owner is set to thirdParty and the present data gets pushed to the <strong>productHistory[]</strong> (which helps us to track the origin and handling of the product). Simultaneously, the product is shipped by the manufacturer (<strong>shipToThirdParty()</strong>) and is received by the Third Party where <strong>receivedByThirdParty()</strong> is called and the details of the Third Party seller are entered. Each of these checkpoint's data is stored in product history with the state being updated at each step. 
</p>
<p>
  The online purchase of the product takes place from the Third Party. When the customer orders the product, it is shipped by the Third Party (<strong>shipByThirdParty()</strong>) and received by the delivery hub where the <strong>receivedByDeliveryHub()</strong> is called. Here the customer address is stored, owner is set to Delivery Hub, details of the Delivery Hub are fed and the current data state gets pushed to the <strong>productHistory[].</strong>
</p>
<p>
  Finally the product is shipped by the Delivery Hub (<strong>shipByDeliveryHub()</strong>) and received by the customer where the <strong>receivedByCustomer()</strong> is called and the current and final state gets pushed to the <strong>productHistory[]</strong>.
</p>
<p>
  All of these juncture functions shall be called only after complete verification of product and <strong>productHistory[]</strong> while entering a checkpoint. (eg:- Customer accepts and confirms the product by clicking the receive button from his account only after it verifies the product). 
</p>
<p>
  <strong>fetchProductPart1()</strong>, <strong>fetchProductPart2()</strong>, <strong>fetchProductPart3()</strong>, <strong>fetchProductHistoryLength()</strong>, <strong>fetchProductCount()</strong>, <strong>fetchProductState()</strong> are the functions to retreive data of a product queried with UID and data type as product(current state) or history.
</p>
<p>
  The hashes(read certificates) are generated using the Solidity cryptographic function <strong>keccak256()</strong> which implements a SHA-3 hash in the blockchain setup. <strong>keccak256()</strong> generates a secure 256-bit hash which is the main basis of security in the entire mainnet apart from the smart contracts being immutable. In our supply chain setup certificates are generated at every stage of shipping of the product. 
</p>


### Contract Diagrams
<h4> Sequence Diagram</h4>
The flow of the functions in the smart contracts.
<p align="centre">
  <a>
    <img src="https://github.com/Emadmousavi/Eth-SupplyChain-DApp/blob/main/DApp/images/sequencediagram.png?raw=true" width="1000">
  </a>
</p>
<h3> Data Flow Diagram </h3>
The entire structure of the code.
<p align="centre">
  <a>
    <img src="https://github.com/Emadmousavi/Eth-SupplyChain-DApp/blob/main/DApp/images/dataflow.png?raw=true">
  </a>
</p>

### Installation and Setup
Prerequisites : `npm, git, docker`

#### Clone the repository 
```Bash
git clone https://github.com/Emadmousavi/Eth-SupplyChain-DApp.git && cd Eth-SupplyChain-DApp
```
#### bootstrap blockchain
```
cd blockchain && docker-compose up -d
```

#### bootstrap DApp
open second terminal and do following
```Bash
cd DApp && cd client && npm install && npm start
```

#### Migrate the contracts
open third terminal and cd in client folder
```Bash
truffle migrate --network=develop --reset
```

The DApp gets hosted by default at port 3000.



### Documentation to help with Solidity
https://docs.soliditylang.org/en/v0.8.4/
### Documentation to help with React
https://reactjs.org/docs/getting-started.html
### Documentation to help with Truffle
https://www.trufflesuite.com/docs/truffle/reference/configuration

<br>
<br>



# blockchain
## Local PoA Ethereum Network

A set of Docker images to create a local PoA Ethereum network with one bootnode, three miners, one fullnode, two swarm bee nodes, two explorers, a monitor and its corresponding dashboard. This was built to understand how local PoA Ethereum networks have to be set up and to provide a local test environment.

The testnet consists of several parts:

- 1 bootnode: registers existing nodes on the network, discovery service.
- 3 miners: also called **sealers** within proof-of-authority (PoA). They validate the blocks.
- 1 fullnode: this serves as **transaction relay** and is a fullnode that does not mine, is locked but has RPC exposed.
- 2 swarm bee nodes: these nodes make up the **peer-to-peer CDN**.
- 2 blockchain explorer: a lightweight web applications to explore the blockchain and blockscout explorer.
- 1 monitor and its corresponding dashboard: the monitor collects data from the fullnode which is displayed through the dashboard.

### Quick start

Setting up this network requires you to install Docker and Docker Compose. Clone the repository, and run `docker-compose up -d` 

The network should start and synchronize without any further configuration. The network always uses the latest available version of Ethereum (geth), the network is set up for clique proof-of-authority similar to the Ethereum Rinkeby testnet.

### Topology

#### Bootnode

The nodes in the network are connecting with the bootnode. This is a special Ethereum node, designed to provide a register of the existing nodes in the network. The parameter `nodekeyhex` in the `docker-compose.yml` is needed to derive the `enodeId` which is later passed to the other nodes. The IP needs to be fixed, as the other nodes need to know where to find the bootnode, and DNS is not supported. The bootnode does not participate in synchronization of state or mining.

#### Miners and fullnode

There are four nodes that participate in the network. The state is synchronized between them and they are trying to create blocks with mining. Initially, they connect to the bootnode with the information derived from the fixed IP and the `nodekeyhex`. If you want to interact with the network, you need to connect via RPC. You can attach a geth instance, connect Remix IDE or connect your browser with web3 and build a dApp.

The RPC Ports of the nodes are mapped to your localhost, the addresses are:

- geth-dev-miner-1: [http://localhost:8539](http://localhost:8539)
- geth-dev-miner-2: [http://localhost:8541](http://localhost:8541)
- geth-dev-miner-3: [http://localhost:8543](http://localhost:8543)
- geth-dev-node: [http://localhost:8545](http://localhost:8545)

#### Swarm bee / IPFS

Work in progress

#### Blockchain explorer

A blockchain explorer fetches the data from `geth-dev-node` through RPC calls. The blockchain explorers can be found at the addresses:

- lite-explorer: [http://localhost:8800](http://localhost:8800)
- blockscout-explorer: [http://localhost:8800](http://localhost:4000)

#### Blockchain monitor and dashboard

The blockchain dashboard is a simple node.js web application being provided by two separate containers: `monitor` and `dashboard`. The monitor collects data from `geth-dev-node` which is displayed through the dashboard. The blockchain dashboard can be found at [http://localhost:8008](http://localhost:8008).

