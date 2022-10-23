//import 
//main function 
//calling of main function 

const { getNamedAccounts, deployments, network } = require("hardhat")

// function deployFunc(hre){
//     console.log("HI!");
// }

const { networkConfig } = require("../helper-hardhat-config")
const { network } = require("hardhat")

// module.exports.default = deployFunc

module.exports = async({getNamedAccounts, deployments}) => {
    //pulling functions from the hre env 
    const {deploy, log } = deployments
    const {deployer} = await getNamedAccounts() // getNamedAccouts is way to get named accounts from the hardhat.config.js script
    const chainId = network.config.chainId

    const ethUsdPriceFeedAddress = networkConfig[chainId]["ethUsdPriceFeed"]

    //deploying the contract 
    const fundMe = await deploy("FundMe", {
        from: deployer,
        args:[],
        log: true,
    })
} 