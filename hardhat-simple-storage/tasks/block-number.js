const {task} = require("hardhat/config")

//print the current block number 
task("block-number", "print the current block number").setAction(
    async (taskArgs, hre/*this is the representation of hardhat*/) => {
        const blockNumber = await hre.ethers.provider.getBlockNumber()
        console.log(`Current block number: ${blockNumber}`);
    }
)