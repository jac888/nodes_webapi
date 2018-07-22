var Web3 = require("web3");
//IPFS gateway:	https://ipfs.infura.io/ipfs/
//IPFS API: https://ipfs.infura.io:5001/api/

const mainnet = "https://mainnet.infura.io/7013489ae50342acb4b992ef3b171d9c";
const rinkeby = "https://rinkeby.infura.io/7013489ae50342acb4b992ef3b171d9c";
const walletAddress = "0x92357843F46d738B386F1FbEd57664EE62f353F5";
const web3 = new Web3(new Web3.providers.HttpProvider(rinkeby));
var balance = web3.eth.getBalance(walletAddress); //Will give value in.
balance = web3.fromWei(web3.toDecimal(balance));
console.log(balance);
