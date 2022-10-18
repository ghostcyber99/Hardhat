// testing the code locally 
const {ethers} = require("hardhat")
const {expect, assert } = require("chai")

describe("SimpleStorage", function() {
  let simpleStorage, simpleStorageFactory
  beforeEach(async function() {
      simpleStorageFactory = await ethers.getContractFactory(
        "SimpleStorage"
      )
      simpleStorage = await simpleStorageFactory.deploy()
  })

  it("Should start with a favourite number of 0", async function(){
    const currentValue = await simpleStorage.retrieve()
    //checking to see the value of the currentvalue is equal to 0
    const expectedValue = "0"
    assert.equal(currentValue.toString(), expectedValue)
  })
  it("should update when we call store", async function(){
    const expectedValue = "7"
    //checking the updated value
    const transactionResponse = await simpleStorage.store(expectedValue)
    await transactionResponse.wait(1)
    //getting the current value  
    const currentValue = await simpleStorage.retrieve()
    assert.equal(currentValue.toString(), expectedValue)
  })
})