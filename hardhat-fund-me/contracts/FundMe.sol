// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

import "./PriceCoverter.sol";

error NotOwer();

contract fundMe {
    using PriceConverter for uint256;

    uint256 public constant MINIUM_USD = 50 * 1e18; //constand variables usaully are in all caps - thats their naming convertion

    //saving the funders
    address[] public funders;
    //mapping the ammount funded to the funder
    mapping(address => uint256) public addressToAmountFunded;

    //making sure only the owner of the constract can withdraw form the contract
    address public immutable i_owner;

    //setting the interface to use whatever chain you are on
    AggregatorV3Interface public priceFeed;

    constructor(address priceFeedAddress) {
        i_owner = msg.sender;
        priceFeed = AggregatorV3Interface(priceFeedAddress);
    }

    //contract  can hold funds like wallets can hold funds
    function fund() public payable {
        //the requier keyword means that, that is the minimum amount someone can send to this contract
        //msg.value is the value funded into the contract
        //msg.sender is the address of whoever is sending money into the contract
        //1e18 is the value of wei == 1eth
        //reverting is where the contract revert any gas because the contract value was not met.
        // gas was spent in the initail computation but every else would be reverted
        require(
            msg.value.getConversationRate(priceFeed) >= MINIUM_USD,
            "Not enough"
        );
        funders.push(msg.sender);
        addressToAmountFunded[msg.sender] = msg.value;
    }

    function withdraw() public onlyOwner {
        for (
            uint256 funderIndex = 0;
            funderIndex < funders.length;
            funderIndex++
        ) {
            // code
            //looping through the funders array
            address funder = funders[funderIndex];
            //reset the mapping
            addressToAmountFunded[funder] = 0;
        }
        // reset the array
        funders = new address[](0);

        //withdrawing - there are 3 ways to send eth 1.transfer 2.send 3.call
        //in solidity we can only send native blockchain token like ethereum with payable addresses
        //payable(msg.sender) = payable address
        //msg.sender = address
        //transfer menthod
        //payable(msg.sender).transfer(address(this).balance); // this is capped at 2300 gas and if this contracts uses more gas or fails it would throw an error - tranfer method
        //send is also capped at 2300 gas and if it fails it would return a boolean
        //send
        //bool sendSuccess = payable(msg.sender).send(address(this).balance);
        //require(sendSuccess, "Send failed");
        //call - this is the recomended way to send eth or your token of chioce
        // this method can be used to call any function in all of eth without even having the ABI
        (bool callSucess, ) = payable(msg.sender).call{
            value: address(this).balance
        }("");
        require(callSucess, "call failed");
    }

    modifier onlyOwner() {
        //the only owner in the withdrawal function says that before the function is executed check if it is the owner if it is then continue.
        //the _ means that then do the rest if not throw the error Sneder is not owner
        //require(msg.sender == i_owner, "Sender is not owner");
        if (msg.sender != i_owner) {
            revert NotOwer();
        }
        _;
    }

    //now if there is a blank transcation it would be sent back to the fund function
    receive() external payable {
        fund();
    }

    //now if there is a transction without the fund function called it is automatially sent to the fund function
    fallback() external payable {
        fund();
    }
}

// libraries are similar to contracts but you cant send eth and you cant declear state variables
