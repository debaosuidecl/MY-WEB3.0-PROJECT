const Web3 = require("web3");
const dotenv = require("dotenv");

dotenv.config();

const privatekey = process.env.PRIVATEKEY;
// @ts-ignore
const web3 = new Web3(
  "https://eth-ropsten.alchemyapi.io/v2/RrDDvUv7zp0o0EdxDqa3CgZo5D7A-8ub"
);

(async () => {
  const weibalance = await web3.eth.getBalance(
    "0x3c2Ff2FeB98B5f7C2C59B5F813d67b27a2EC1182"
  );
  const ethbalance = await web3.utils.fromWei(weibalance, "ether");

  console.log(weibalance, "weibalance"); // wei balance
  console.log(ethbalance, "ethbalance");

  const address = "0x3c2Ff2FeB98B5f7C2C59B5F813d67b27a2EC1182";
  const receiver = "0x65BA161975dAa58A55dc98421B782eCB35DdA655";
  // const privatekey =
  //   "068e89f7db04081ca791a005bc220186481cfb51c41d67e5f41510f3a104e425";

  console.log(`Sending money to ${receiver} from ${address}`);

  const createTransaction = await web3.eth.accounts.signTransaction(
    {
      from: address,
      to: receiver,
      value: web3.utils.toWei("0.01", "ether"),
      gas: 21000,
    },
    privatekey
  );

  const receipt = await web3.eth.sendSignedTransaction(
    createTransaction.rawTransaction
  );

  console.log("transaction with hash: ", receipt.transactionHash);
})();
