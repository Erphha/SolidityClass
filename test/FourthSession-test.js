const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("FourthSession", function () {
  let FourthSession;
  let owner;
  let addr1;
  let addr2;

  beforeEach(async function () {
    FourthSession = await ethers.getContractFactory("FourthSession");
    [owner, addr1, addr2] = await ethers.getSigners();
    FourthSession = await FourthSession.deploy();
    await FourthSession.deployed();
  });

  it("Should mint and withdraw properly", async function () {
    //Checking the minting function!
    const payment = { value: ethers.utils.parseEther("3.0") };
    await FourthSession.mintNFT(1, payment);

    //Setting a new price to our NFTs!
    const newPrice = 5;
    await FourthSession.setNewPrice(newPrice);

    //Getting the owner of NFTs by id!
    await FourthSession.getOwnerOfNft(0);

    //Checking the withdraw function along with balances of owner(customers) and contract!
    console.log("Balance of Owner: ", await owner.getBalance());
    const contractAddress = FourthSession.address;
    console.log(
      "Balance of Contract: ",
      await ethers.provider.getBalance(contractAddress)
    );

    //Running the withdraw!
    await FourthSession.withdraw();
    console.log("Balance of Owner: ", await owner.getBalance());
  });
});
