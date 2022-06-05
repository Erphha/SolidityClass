//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract FourthSession {
    uint256 public maxSupply = 50;
    uint256 public maxMintAmount = 2;
    uint256 public nftPrice = 3 ether;
    address public owner = 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266;
    uint256 counter = 0;

    mapping(uint256 => address) public nfts;

    function mintNFT(uint256 _mintAmount) public payable {
        require(_mintAmount > 0);
        require(_mintAmount <= maxMintAmount);
        require(msg.value >= nftPrice);

        if (msg.sender != owner) {
            require(msg.value >= nftPrice * _mintAmount);
        }
        nfts[counter] = address(msg.sender);
        counter++;
    }

    function getOwnerOfNft(uint256 _id) public view returns (address) {
        return nfts[_id];
    }

    function setNewPrice(uint256 _newPrice) public {
        require(msg.sender == owner);
        nftPrice = _newPrice;
    }

    function withdraw() public {
        require(msg.sender == owner);
        uint256 contractBalance = address(this).balance;
        payable(msg.sender).transfer(contractBalance);
    }
}
