const ethers = require("ethers");
const fs = require("fs-extra");

async function main() {
  //http:127.0.0.1:7545
  //connecting our script to local blockchain
  const provider = new ethers.providers.JsonRpcProvider(
    "http://127.0.0.1:8545"
  );
  //connecting our wallet
  const wallet = new ethers.Wallet(
    "0xa61ff94eff3bdbd31bde1f70064de07fbe328680eadc7ea2cab3a2f5c2577e98",
    provider
  );
  //connecting to the contract ABI
  const abi = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi", "utf8");
  //connect to the contract binary
  const binary = fs.readFileSync(
    "./SimpleStorage_sol_SimpleStorage.bin",
    "utf8"
  );
  //connecting to the contract factory which is used to deploy contracts
  const contractFactory = new ethers.ContractFactory(abi, binary, wallet);
  console.log("Deploying, please wait....");
  const contract = await contractFactory.deploy();
  console.log(contract);
}
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
