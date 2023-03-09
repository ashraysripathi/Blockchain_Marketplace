// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Fiducia is ERC20 {
    constructor(uint256 initialSupply) public ERC20("Fiducia", "FDCA") {
        _mint(msg.sender, initialSupply);
    }
}
