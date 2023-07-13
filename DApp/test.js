var keythereum = require("keythereum");
var datadir = ".";
var address= "6044cd5ac1173575b20cd5ae8846170b92109739";
const password = "password";

var keyObject = keythereum.importFromFile(address, datadir);
var privateKey = keythereum.recover(password, keyObject);
console.log(privateKey.toString('hex'));
