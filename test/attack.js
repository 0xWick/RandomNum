const { ethers, waffle } = require("hardhat");
const { expect } = require("chai");
const { BigNumber, utils } = require("ethers");

describe("Attack", function () {
    it("Should be able to guess the exact number", async function() {
        // Deploy the Game contract
        const gameContract = await ethers.getContractFactory("Game");
        const _gameContract = await gameContract.deploy({ value: utils.parseEther("0.1")});
        await _gameContract.deployed();

        console.log("Game contract address", _gameContract.address);

        // Deploy the Attack contract
        const attackContract = await ethers.getContractFactory("Attack");
        const _attackContract = await attackContract.deploy(_gameContract.address);
        // await _attackContract.deployed();

        console.log("Attack contract address", _attackContract.address);

        // Attack the Game contract
        let tx = await _attackContract.attack();
        await tx.wait();

        const balanceGame = await _gameContract.balance();


        // Balance of the Game contract should be 0
        expect(balanceGame).to.equal(BigNumber.from("0"));
    });
});