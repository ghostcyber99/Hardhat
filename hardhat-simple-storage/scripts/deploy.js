//imports 
const {ethers, run, network} = require("hardhat")

//async main
async function main() {
  const SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage")
  console.log("Dploying contract.....");
  const simpleStorage = await SimpleStorageFactory.deploy()
  await simpleStorage.deployed()
  console.log(`Deployed contract to ${simpleStorage.address}`);
  if (network.config.chainId === 5 && process.env.ETHERSCAN_API_KEY ) {
    console.log("waiting for block confirmation");
    await simpleStorage.deployTransaction.wait(7)
    await verify(simpleStorage.address, [])
  }

  //interacting with the smart contract
  const currentValue = await simpleStorage.retrieve()
  console.log(`Current value is ${currentValue}`);

  
  //update the current value 
  const transactionResponse = await simpleStorage.store(15)
  await transactionResponse.wait(1)
  const updatedValue = await simpleStorage.retrieve()
  console.log(`updated value is: ${updatedValue}`);
}

//to verify the code on the goerli testnet 
async function verify(contractAddress, args) {
  console.log("Verifying Contract...");
  try {
    await run("verify:verify", {
      address: contractAddress,
      constructorArguments: args,
  })
} catch(e) {
  if(e.message.toLowerCase().includes("already verified")){
    console.log("Already verified");
  } else {
    console.log(e);
  }
}
}


//main
main()  
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1);
  })