const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("SolidityClass", function () {
  let FourthSession;
  let owner;
  let addr1;
  let addr2;

  // beforeEach(async function () {
  //   FourthSession = await ethers.getContractFactory("FourthSession");
  //   [owner, addr1, addr2] = await ethers.getSigners();
  //   FourthSession = await FourthSession.deploy();
  //   await FourthSession.deployed();
  // });
  
  beforeEach(async function () {
    FifthSession = await ethers.getContractFactory("FifthSession");
    [owner, addr1, addr2] = await ethers.getSigners();
    FifthSession = await FifthSession.deploy();
    await FifthSession.deployed();
  });

  it("Should mint different types of rarity", async function () {
    // MINTING A COMMON NFT BY 2 ETHERS
    const commonPayment = { value: ethers.utils.parseEther("2.0") };
    await FifthSession.mintCommonNFT(commonPayment);

    // MINTING A RARE NFT BY 5 ETHERS
    const rarePayment = { value: ethers.utils.parseEther("5.0") };
    await FifthSession.mintRareNFT(rarePayment);

    // MINTING A SUPER_RARE NFT BY 10 ETHERS
    const super_rarePayment = { value: ethers.utils.parseEther("10.0") };
    await FifthSession.mintSuper_rareNFT(super_rarePayment);

    //WITHDRAW

    console.log(
      "Balance of Owner: ",
      ethers.BigNumber.from(await owner.getBalance()).toString()
    );

    console.log(
      "Balance: ",
      ethers.BigNumber.from(
        await ethers.provider.getBalance(FifthSession.address)
      ).toString()
    );

    await FifthSession.withdraw();
    console.log('Withdrawed successfully');

    console.log(
      "Balance of Owner: ",
      ethers.BigNumber.from(await owner.getBalance()).toString()
    );

    console.log(
      "Balance: ",
      ethers.BigNumber.from(
        await ethers.provider.getBalance(FifthSession.address)
      ).toString()
    );
  });

  // it("Should mint and withdraw properly", async function () {
  //   //Checking the minting function!
  //   const payment = { value: ethers.utils.parseEther("3.0") };
  //   await FourthSession.mintNFT(1, payment);

  //   //Setting a new price to our NFTs!
  //   const newPrice = 5;
  //   await FourthSession.setNewPrice(newPrice);

  //   //Getting the owner of NFTs by id!
  //   await FourthSession.getOwnerOfNft(0);

  //   //Checking the withdraw function along with balances of owner(customers) and contract!
  //   console.log(
  //     "Balance of Owner: ",
  //     ethers.BigNumber.from(await owner.getBalance()).toString()
  //   );
  //   const contractAddress = FourthSession.address;
  //   console.log(
  //     "Balance: ",
  //     ethers.BigNumber.from(
  //       await ethers.provider.getBalance(contractAddress)
  //     ).toString()
  //   );

  //   //Running the withdraw!
  //   await FourthSession.withdraw();
  //   console.log(
  //     "Balance: ",
  //     ethers.BigNumber.from(await owner.getBalance()).toString()
  //   );
  // });
});
