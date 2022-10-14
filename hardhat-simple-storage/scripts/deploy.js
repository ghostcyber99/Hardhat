//imports 
const {ethers} = require("hardhat")

//async main
async function main() {
  const SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage")
  console.log("Dploying contract.....");
  const simpleStorage = await SimpleStorageFactory.deploy()
  await simpleStorage.deployed()
  console.log(`Deployed contract to ${simpleStorage.address}`);
}

//to verify the code on the goerli testnet 
async function verify(contractAddress, args) {

}


//main
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1);
  })