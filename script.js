const Web3 = require("web3");
const dotenv = require("dotenv");

// @ts-ignore
const web3 = new Web3("http://127.0.0.1:7545");

dotenv.config();
(async () => {
  const weibalance = await web3.eth.getBalance(
    "0xc000d26c4775fC39B66AfC9CA797d68050377622"
  );
  const ethbalance = await web3.utils.fromWei(weibalance, "ether");

  console.log(weibalance, "weibalance");
  console.log(ethbalance, "ethbalance");

  const address = "0xc000d26c4775fC39B66AfC9CA797d68050377622";
  const receiver = "0x5B03395aF30460F51D5E508c1e6E050cd5b2d724";
  const privatekey = process.env.privatekey;

  console.log(`Sending money to ${receiver} from ${address}`);

  const createTransaction = await web3.eth.accounts.signTransaction(
    {
      from: address,
      to: receiver,
      value: web3.utils.toWei("10", "ether"),
      gas: 21000,
    },
    privatekey
  );

  const receipt = await web3.eth.sendSignedTransaction(
    createTransaction.rawTransaction
  );

  console.log("transaction with hash: ", receipt.transactionHash);
})();

// console.log(balance, "poo");
