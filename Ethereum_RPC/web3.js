var Web3 = require("web3");
//IPFS gateway:	https://ipfs.infura.io/ipfs/
//IPFS API: https://ipfs.infura.io:5001/api/

const ganache = "http://127.0.0.1:7545";
const mainnet = "https://mainnet.infura.io/7013489ae50342acb4b992ef3b171d9c";
const rinkeby = "https://rinkeby.infura.io/7013489ae50342acb4b992ef3b171d9c";
const walletAddress = "0x92357843F46d738B386F1FbEd57664EE62f353F5";
const contractAddress = "0xDDE26e315D606B856aeb8F0F91cD9B02239f72C3";
const web3 = new Web3(new Web3.providers.HttpProvider(rinkeby));

// var balance = web3.eth.getBalance(walletAddress); //Will give value in.
// balance = web3.fromWei(web3.toDecimal(balance));
// console.log(balance);

const abi = [
  {
    constant: true,
    inputs: [],
    name: "name",
    outputs: [{ name: "", type: "string" }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      { name: "_spender", type: "address" },
      { name: "_value", type: "uint256" }
    ],
    name: "approve",
    outputs: [{ name: "success", type: "bool" }],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "totalSupply",
    outputs: [{ name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      { name: "_from", type: "address" },
      { name: "_to", type: "address" },
      { name: "_value", type: "uint256" }
    ],
    name: "transferFrom",
    outputs: [{ name: "success", type: "bool" }],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "standard",
    outputs: [{ name: "", type: "string" }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [{ name: "", type: "address" }],
    name: "balanceOf",
    outputs: [{ name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "symbol",
    outputs: [{ name: "", type: "string" }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      { name: "_to", type: "address" },
      { name: "_value", type: "uint256" }
    ],
    name: "transfer",
    outputs: [{ name: "result", type: "bool" }],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: true,
    inputs: [{ name: "", type: "address" }, { name: "", type: "address" }],
    name: "allowance",
    outputs: [{ name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "constructor"
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: "_from", type: "address" },
      { indexed: true, name: "_to", type: "address" },
      { indexed: false, name: "_value", type: "uint256" }
    ],
    name: "Transfer",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: "_owner", type: "address" },
      { indexed: true, name: "_spender", type: "address" },
      { indexed: false, name: "_value", type: "uint256" }
    ],
    name: "Approval",
    type: "event"
  }
];

var version = web3.version.api;
console.log(version); // "0.2.0"
//In web3 < 1.0, this is the syntax (contract lowercase c, no 'new'):
var LDHTokenContract = web3.eth.contract(abi);
var contractInstance = LDHTokenContract.at(contractAddress);
//console.log(contractInstance);

contractInstance.totalSupply.call((error, result) => {
  console.log(
    "total supply of LDHTokenB3 token : " + result.toNumber() + " units!"
  );
});
var address = "0x92357843F46d738B386F1FbEd57664EE62f353F5";
contractInstance.balanceOf.call(address, (error, result) => {
  console.log(
    "Balace of this address : " +
      address +
      " is : " +
      result.toNumber() +
      " token remaining"
  );
});

// console.log(LDHTokenContract.contractAddress);
// var methods = LDHTokenContract;
// console.log(LDHTokenContract.methods);
// //In web3 >= 1.0...
// var MyContract = new web3.eth.Contract(abiArray, contractAddress);
// var version = web3.version; // "1.0.0"
//console.log(LDHTokenContract);
