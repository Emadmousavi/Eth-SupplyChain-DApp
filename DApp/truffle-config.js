const path = require("path");

module.exports = {
  compilers: {
    solc: {
      settings: {
        optimizer: {
          enabled: true,
          runs: 200  
        }
      }
    }
  },
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  networks: {
    develop: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*", // match any network
      websockets: true
    },
    clique: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*",
      websockets: false,
      gasPrice: 100000000000,
      // gaslimit: 12500000000000000000000000,
      from: "0x9f67866CB3B3E7a5Cee9E71a9905FE1A1eF37a81"
    }
  }
  
};
