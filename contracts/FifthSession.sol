//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract FifthSession{
    uint initialPrice = 1 ether;
    uint commonPrice;
    uint rarePrice;
    uint super_rarePrice;
    address contractOwner;

    enum Rarity{
        common,
        rare,
        super_rare
    }
    Rarity public rarity;

    constructor(){
        contractOwner = msg.sender;
    }

    mapping (address => bool) public nftOwner;

    modifier onlyContractOwner(){
        require(msg.sender == contractOwner);
        _;
    }

    modifier mintOnce(){
        require(nftOwner[msg.sender] == false , 'minted once');
        if(msg.sender == contractOwner){
            nftOwner[msg.sender] = false;
        }else{
            nftOwner[msg.sender] = true;
        }
        _;
    }

    function common ()private {
        rarity = Rarity.common;
        commonPrice = initialPrice * 2;
    }
    function rare ()private {
        rarity = Rarity.rare;
        rarePrice = initialPrice * 5;
    }
    function super_rare ()private {
        rarity = Rarity.super_rare;
        super_rarePrice = initialPrice * 10;
    }

    function mintCommonNFT() public payable mintOnce{
        common();
        require(rarity == Rarity.common);
        require(msg.value >= commonPrice);
    }

    function mintRareNFT() public payable mintOnce{
        rare();
        require(rarity == Rarity.rare);
        require(msg.value >= rarePrice);
    }

    function mintSuper_rareNFT() public payable mintOnce{
        super_rare();
        require(rarity == Rarity.super_rare);
        require(msg.value >= super_rarePrice);
    }

    
        
    
}