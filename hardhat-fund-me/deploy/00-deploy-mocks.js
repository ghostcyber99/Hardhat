const { network } = require("hardhat")
const {developmentChain} = require("../helper-hardhat-config")

module.exports = async({getNamedAccounts, deployments}) => {

    const {deploy, log } = deployments
    const {deployer} = await getNamedAccounts() // getNamedAccouts is way to get named accounts from the hardhat.config.js script
    const chainId = network.config.chainId

    if(developmentChain.includes(chainId)){
        log("Local network detected! Deploying mocks....")
        await deploy("MockV3Aggregator", {
            contract: "MockV3Aggregator",
            from: deployer,
            log: true,
        })
    }

}